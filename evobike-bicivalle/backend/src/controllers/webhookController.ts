import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { wompiService } from '../services/wompiService.js';
import { siigoService } from '../services/siigoService.js';
import { AuditLogger } from '../utils/auditLogger.js';
import { EmailService } from '../utils/emailService.js';

const prisma = new PrismaClient();

export const handleWompiWebhook = async (req: Request, res: Response) => {
  try {
    const event = req.body;
    const signature = req.headers['x-event-signature'] as string;

    if (!wompiService.verifyEventSignature(event, signature)) {
      console.error('Invalid signature from Wompi');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    console.log('Wompi webhook received:', event.event);

    if (event.event === 'transaction.updated') {
      const transaction = event.data.transaction;

      if (transaction.status === 'APPROVED') {
        const order = await prisma.order.findFirst({
          where: { orderNumber: transaction.reference },
          include: { items: { include: { product: true } } },
        });

        if (!order) {
          console.error('Order not found:', transaction.reference);
          return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status === 'PAID') {
          return res.json({ message: 'Order already processed' });
        }

        await prisma.$transaction(async (tx) => {
          const inventoryChanges: any[] = [];

          for (const item of order.items) {
            const oldProduct = await tx.product.findUnique({
              where: { id: item.productId },
            });

            await tx.product.update({
              where: { id: item.productId },
              data: {
                inventoryCount: {
                  decrement: item.quantity,
                },
              },
            });

            const newProduct = await tx.product.findUnique({
              where: { id: item.productId },
            });

            inventoryChanges.push({
              productId: item.productId,
              productName: item.nameSnapshot,
              oldCount: oldProduct?.inventoryCount,
              newCount: newProduct?.inventoryCount,
            });
          }

          await tx.order.update({
            where: { id: order.id },
            data: {
              status: 'PAID',
              isPaid: true,
            },
          });

          await tx.adminNotification.create({
            data: {
              type: 'ORDER_PAID',
              message: `Nuevo pedido confirmado: ${order.orderNumber} - ${order.customerName} - Wompi`,
              orderId: order.id,
            },
          });

          await AuditLogger.log({
            action: 'PAYMENT_CONFIRMED_WOMPI',
            entity: 'Order',
            entityId: order.id,
            changes: {
              orderNumber: order.orderNumber,
              wompiTransactionId: transaction.id,
              inventoryAdjustments: inventoryChanges,
            },
            severity: 'CRITICAL',
            message: `Pago confirmado vía Wompi: ${order.orderNumber} - Total: $${order.total}`,
          });
        });

        try {
          await siigoService.createSaleInSiigo({
            customer: {
              identification: order.phone.replace(/[^0-9]/g, '').slice(-10),
              name: order.customerName,
              email: order.email,
              phone: order.phone,
              address: order.address,
            },
            items: order.items.map(item => ({
              productCode: item.product.siigoCode || 'GENERICO',
              name: item.nameSnapshot,
              quantity: item.quantity,
              price: item.priceSnapshot,
            })),
            total: order.total,
            notes: `Pedido online ${order.orderNumber} - Wompi`,
          });

          console.log('Factura creada en Siigo para orden:', order.orderNumber);
        } catch (siigoError) {
          console.error('Error creando factura en Siigo:', siigoError);
        }

        EmailService.notifyAdminNewOrder(order).catch(console.error);
        EmailService.sendOrderConfirmation(order).catch(console.error);

        console.log('Pago procesado exitosamente:', order.orderNumber);
      }
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: error.message });
  }
};