import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuditLogger } from '../utils/auditLogger.js';
import { EmailService } from '../utils/emailService.js';

const prisma = new PrismaClient();

export const refundOrder = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { reason, masterPassword } = req.body;

    // El middleware ya verificó el masterPassword

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status === 'REFUNDED' || order.status === 'CANCELED') {
        throw new Error('Order already refunded or canceled');
      }

      const inventoryReturned: any[] = [];

      if (order.status === 'PAID' || order.status === 'SHIPPED') {
        for (const item of order.items) {
          const oldProduct = await tx.product.findUnique({
            where: { id: item.productId },
          });

          await tx.product.update({
            where: { id: item.productId },
            data: {
              inventoryCount: {
                increment: item.quantity,
              },
            },
          });

          const newProduct = await tx.product.findUnique({
            where: { id: item.productId },
          });

          inventoryReturned.push({
            productId: item.productId,
            productName: item.nameSnapshot,
            oldCount: oldProduct?.inventoryCount,
            newCount: newProduct?.inventoryCount,
            quantityReturned: item.quantity,
          });
        }
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: 'REFUNDED',
        },
        include: {
          items: true,
        },
      });

      await AuditLogger.log({
        action: 'ORDER_REFUNDED',
        entity: 'Order',
        entityId: id,
        changes: {
          orderNumber: order.orderNumber,
          previousStatus: order.status,
          newStatus: 'REFUNDED',
          inventoryReturned,
          reason,
        },
        severity: 'CRITICAL',
        message: `🔴 DEVOLUCIÓN: ${order.orderNumber} - Admin: ${req.user.name} - Razón: ${reason}`,
        userId: req.user.id,
      });

      await tx.adminNotification.create({
        data: {
          type: 'REFUND_REQUESTED',
          message: `Devolución procesada: ${order.orderNumber} - Razón: ${reason}`,
          orderId: id,
        },
      });

      return updatedOrder;
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error refunding order:', error);
    res.status(400).json({ error: error.message });
  }
};

export const cancelOrder = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { reason, masterPassword } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status === 'CANCELED' || order.status === 'REFUNDED') {
        throw new Error('Order already canceled or refunded');
      }

      const inventoryReturned: any[] = [];

      if (order.status === 'PAID') {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              inventoryCount: {
                increment: item.quantity,
              },
            },
          });

          inventoryReturned.push({
            productId: item.productId,
            productName: item.nameSnapshot,
            quantityReturned: item.quantity,
          });
        }
      }

      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: 'CANCELED',
        },
      });

      await AuditLogger.log({
        action: 'ORDER_CANCELED',
        entity: 'Order',
        entityId: id,
        changes: {
          orderNumber: order.orderNumber,
          previousStatus: order.status,
          inventoryReturned,
          reason,
        },
        severity: 'CRITICAL',
        message: `🔴 CANCELACIÓN: ${order.orderNumber} - Admin: ${req.user.name} - Razón: ${reason}`,
        userId: req.user.id,
      });

      return updatedOrder;
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error canceling order:', error);
    res.status(400).json({ error: error.message });
  }
};