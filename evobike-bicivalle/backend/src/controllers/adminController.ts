import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuditLogger } from '../utils/auditLogger.js';
import { EmailService } from '../utils/emailService.js';

const prisma = new PrismaClient();

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { status, page = '1', limit = '20' } = req.query;

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING_PAYMENT', 'PAID', 'READY_TO_SHIP', 'SHIPPED', 'CANCELED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const currentOrder = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!currentOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const oldStatus = currentOrder.status;

    if (status === 'CANCELED' && currentOrder.status === 'PAID') {
      await prisma.$transaction(async (tx) => {
        const inventoryReturned: any[] = [];

        for (const item of currentOrder.items) {
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

        await AuditLogger.logOrderCanceled(currentOrder, inventoryReturned, {
          ip: req.ip,
          userAgent: req.headers['user-agent'],
        });
      });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    await AuditLogger.logOrderStatusChange(order, oldStatus, status, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // NUEVO: Enviar emails según el cambio de estado
    if (status === 'READY_TO_SHIP') {
      EmailService.notifyReadyToShip(order).catch(console.error);
    } else if (status === 'SHIPPED') {
      EmailService.notifyShipped(order).catch(console.error);
    }

    res.json(order);
  } catch (error: any) {
    await AuditLogger.logError('UPDATE_ORDER_STATUS', 'Order', req.params.id, error, {
      ip: req.ip,
    });
    
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

export const updateProductInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { inventoryCount } = req.body;

    if (typeof inventoryCount !== 'number' || inventoryCount < 0) {
      return res.status(400).json({ error: 'Invalid inventory count' });
    }

    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const oldCount = currentProduct.inventoryCount;

    const product = await prisma.product.update({
      where: { id },
      data: { inventoryCount },
    });

    await AuditLogger.logInventoryUpdate(product, oldCount, inventoryCount, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      manual: true,
    });

    res.json(product);
  } catch (error: any) {
    await AuditLogger.logError('UPDATE_INVENTORY', 'Product', req.params.id, error, {
      ip: req.ip,
    });
    
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Error updating inventory' });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { isRead, limit = '50' } = req.query;

    const where: any = {};
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    const notifications = await prisma.adminNotification.findMany({
      where,
      include: {
        order: true,
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
    });

    const unreadCount = await prisma.adminNotification.count({
      where: { isRead: false },
    });

    res.json({
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await prisma.adminNotification.update({
      where: { id },
      data: { isRead: true },
    });

    res.json(notification);
  } catch (error) {
    console.error('Error marking notification:', error);
    res.status(500).json({ error: 'Error updating notification' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const [
      totalOrders,
      paidOrders,
      pendingOrders,
      totalRevenue,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PAID' } }),
      prisma.order.count({ where: { status: 'PENDING_PAYMENT' } }),
      prisma.order.aggregate({
        where: { status: { in: ['PAID', 'READY_TO_SHIP', 'SHIPPED'] } },
        _sum: { total: true },
      }),
      prisma.product.count({ where: { inventoryCount: { lt: 5 } } }),
    ]);

    res.json({
      totalOrders,
      paidOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const { severity, entity, limit = '100', page = '1' } = req.query;

    const where: any = {};
    if (severity) where.severity = severity;
    if (entity) where.entity = entity;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error getting audit logs:', error);
    res.status(500).json({ error: 'Error fetching audit logs' });
  }
};

export const getEntityAuditLogs = async (req: Request, res: Response) => {
  try {
    const { entity, entityId } = req.params;

    const logs = await prisma.auditLog.findMany({
      where: { entity, entityId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(logs);
  } catch (error) {
    console.error('Error getting entity logs:', error);
    res.status(500).json({ error: 'Error fetching entity logs' });
  }
};
