import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { wompiService } from '../services/wompiService.js';
import { AuditLogger } from '../utils/auditLogger.js';

const prisma = new PrismaClient();

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      city,
      address,
      items,
    } = req.body;

    const productIds = items.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map(p => [p.id, p]));

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
        orderNumber: wompiService.generateReference(),
        status: 'PENDING_PAYMENT',
        customerName,
        email,
        phone,
        city,
        address,
        paymentMethod: 'CARD',
        paymentType: 'FULL_PAYMENT',
        isPaid: false,
        subtotal,
        shipping,
        tax,
        total,
        saleType: 'ONLINE',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    const paymentParams = wompiService.createPaymentParams({
      total: order.total,
      email: order.email,
      customerName: order.customerName,
      phone: order.phone,
    });

    await AuditLogger.log({
      action: 'CHECKOUT_CREATED',
      entity: 'Order',
      entityId: order.id,
      changes: {
        orderNumber: order.orderNumber,
        total: order.total,
        wompiReference: paymentParams.reference,
      },
      severity: 'INFO',
      message: `Checkout creado: ${order.orderNumber} - Total: $${order.total}`,
    });

    res.json({
      order,
      params: paymentParams,
      reference: paymentParams.reference,
    });
  } catch (error: any) {
    console.error('Error creating checkout:', error);
    res.status(500).json({ error: error.message });
  }
};