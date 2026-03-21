import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuditLogger } from '../utils/auditLogger.js';
import { EmailService } from '../utils/emailService.js';

const prisma = new PrismaClient();

const generateOrderNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `EVB-${year}-${random}`;
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      city,
      address,
      notes,
      paymentMethod,
      items,
    } = req.body;

    if (!customerName || !email || !phone || !city || !address || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map(p => [p.id, p]));

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      if (product.inventoryCount < item.quantity) {
        await AuditLogger.logOversellAttempt(
          product.id,
          product.name,
          item.quantity,
          product.inventoryCount,
          { ip: req.ip, userAgent: req.headers['user-agent'] }
        );
        
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}. Available: ${product.inventoryCount}` 
        });
      }
    }

    let subtotal = 0;
    const orderItems = items.map((item: any) => {
      const product = productMap.get(item.productId)!;
      subtotal += product.price * item.quantity;
      return {
        productId: item.productId,
        nameSnapshot: product.name,
        priceSnapshot: product.price,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
      };
    });

    const tax = Math.round(subtotal * 0.19);
    const shipping = 0;
    const total = subtotal + tax + shipping;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        status: 'PENDING_PAYMENT',
        customerName,
        email,
        phone,
        city,
        address,
        notes,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    await AuditLogger.logOrderCreated(order, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json(order);
  } catch (error: any) {
    await AuditLogger.logError('CREATE_ORDER', 'Order', 'unknown', error, {
      ip: req.ip,
      body: req.body,
    });
    
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status !== 'PENDING_PAYMENT') {
        throw new Error('Order already processed');
      }

      const inventoryChanges: any[] = [];

      for (const item of order.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.inventoryCount < item.quantity) {
          await AuditLogger.logOversellAttempt(
            product.id,
            product.name,
            item.quantity,
            product.inventoryCount,
            { 
              ip: req.ip, 
              orderId: order.id,
              orderNumber: order.orderNumber 
            }
          );
          
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        const oldCount = product.inventoryCount;
        const newCount = oldCount - item.quantity;

        await tx.product.update({
          where: { id: item.productId },
          data: {
            inventoryCount: {
              decrement: item.quantity,
            },
          },
        });

        inventoryChanges.push({
          productId: product.id,
          productName: product.name,
          oldCount,
          newCount,
          quantitySold: item.quantity,
        });

        const updatedProduct = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (updatedProduct && updatedProduct.inventoryCount < 5 && updatedProduct.inventoryCount > 0) {
          await tx.adminNotification.create({
            data: {
              type: 'LOW_STOCK',
              message: `Stock bajo para ${updatedProduct.name}: ${updatedProduct.inventoryCount} unidades restantes`,
            },
          });

          await AuditLogger.log({
            action: 'LOW_STOCK_ALERT',
            entity: 'Product',
            entityId: updatedProduct.id,
            changes: {
              productName: updatedProduct.name,
              currentStock: updatedProduct.inventoryCount,
            },
            severity: 'WARNING',
            message: `Alerta de stock bajo: ${updatedProduct.name} - ${updatedProduct.inventoryCount} unidades`,
          });

          // NUEVO: Enviar email de stock bajo
          EmailService.notifyLowStock(updatedProduct).catch(console.error);
        }
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: 'PAID',
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      await tx.adminNotification.create({
        data: {
          type: 'ORDER_PAID',
          message: `Nuevo pedido confirmado: ${updatedOrder.orderNumber} - ${updatedOrder.customerName}`,
          orderId: updatedOrder.id,
        },
      });

      await AuditLogger.logPaymentConfirmed(updatedOrder, inventoryChanges, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });

      return updatedOrder;
    });

    // NUEVO: Enviar emails
    EmailService.notifyAdminNewOrder(result).catch(console.error);
    EmailService.sendOrderConfirmation(result).catch(console.error);

    res.json(result);
  } catch (error: any) {
    await AuditLogger.logError('CONFIRM_PAYMENT', 'Order', req.params.id, error, {
      ip: req.ip,
    });
    
    console.error('Error confirming payment:', error);
    res.status(400).json({ error: error.message || 'Error confirming payment' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};