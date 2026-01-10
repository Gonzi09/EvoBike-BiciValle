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

export const createInPersonSale = async (req: any, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      city,
      address,
      notes,
      paymentMethod,
      paymentType,
      downPayment,
      items,
    } = req.body;

    if (!customerName || !phone || !items || items.length === 0) {
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
          { vendorId: req.user.id, vendorName: req.user.name }
        );
        
        return res.status(400).json({ 
          error: `Stock insuficiente para ${product.name}. Disponible: ${product.inventoryCount}` 
        });
      }
    }

    const result = await prisma.$transaction(async (tx) => {
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

      const isPaid = paymentType === 'FULL_PAYMENT';
      const remainingBalance = paymentType === 'DOWN_PAYMENT' ? total - (downPayment || 0) : 0;

      const order = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          status: isPaid ? 'PAID' : 'PARTIAL_PAYMENT',
          customerName,
          email: email || '',
          phone,
          city: city || 'Tienda',
          address: address || 'Venta en tienda',
          notes,
          paymentMethod,
          paymentType,
          downPayment: downPayment || null,
          remainingBalance: remainingBalance || null,
          isPaid,
          subtotal,
          shipping,
          tax,
          total,
          saleType: 'IN_PERSON',
          createdById: req.user.id,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (downPayment && downPayment > 0) {
        await tx.payment.create({
          data: {
            orderId: order.id,
            amount: downPayment,
            paymentType: paymentMethod,
            notes: 'Abono inicial',
          },
        });
      }

      if (isPaid) {
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
            quantitySold: item.quantity,
          });

          if (newProduct && newProduct.inventoryCount < 5 && newProduct.inventoryCount > 0) {
            await tx.adminNotification.create({
              data: {
                type: 'LOW_STOCK',
                message: `Stock bajo para ${newProduct.name}: ${newProduct.inventoryCount} unidades`,
              },
            });

            EmailService.notifyLowStock(newProduct).catch(console.error);
          }
        }

        await AuditLogger.log({
          action: 'IN_PERSON_SALE',
          entity: 'Order',
          entityId: order.id,
          changes: {
            orderNumber: order.orderNumber,
            total: order.total,
            inventoryAdjustments: inventoryChanges,
          },
          severity: 'CRITICAL',
          message: `Venta en persona creada: ${order.orderNumber} - Vendedor: ${req.user.name} - Total: $${order.total}`,
          userId: req.user.id,
        });
      } else {
        await AuditLogger.log({
          action: 'PARTIAL_PAYMENT_SALE',
          entity: 'Order',
          entityId: order.id,
          changes: {
            orderNumber: order.orderNumber,
            total: order.total,
            downPayment: downPayment,
            remainingBalance: remainingBalance,
          },
          severity: 'WARNING',
          message: `Venta con abono: ${order.orderNumber} - Vendedor: ${req.user.name} - Abono: $${downPayment} - Restante: $${remainingBalance}`,
          userId: req.user.id,
        });
      }

      await tx.adminNotification.create({
        data: {
          type: 'ORDER_PAID',
          message: `${isPaid ? 'Venta' : 'Abono'} registrado por ${req.user.name}: ${order.orderNumber} - ${customerName}`,
          orderId: order.id,
        },
      });

      return order;
    });

    EmailService.notifyAdminNewOrder({
      ...result,
      vendorName: req.user.name,
    }).catch(console.error);

    res.status(201).json(result);
  } catch (error: any) {
    await AuditLogger.logError('CREATE_IN_PERSON_SALE', 'Order', 'unknown', error, {
      vendorId: req.user?.id,
      vendorName: req.user?.name,
    });
    
    console.error('Error creating sale:', error);
    res.status(500).json({ error: 'Error creating sale' });
  }
};

export const addPaymentToOrder = async (req: any, res: Response) => {
  try {
    const { orderId } = req.params;
    const { amount, paymentMethod, notes } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true, payments: true },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.isPaid) {
        throw new Error('Order already fully paid');
      }

      const totalPaid = order.payments.reduce((sum, p) => sum + p.amount, 0) + amount;

      if (totalPaid > order.total) {
        throw new Error('Payment exceeds order total');
      }

      await tx.payment.create({
        data: {
          orderId,
          amount,
          paymentType: paymentMethod,
          notes,
        },
      });

      const isPaid = totalPaid >= order.total;
      const remainingBalance = order.total - totalPaid;

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          isPaid,
          remainingBalance: isPaid ? 0 : remainingBalance,
          status: isPaid ? 'PAID' : 'PARTIAL_PAYMENT',
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          payments: true,
        },
      });

      if (isPaid && order.status !== 'PAID') {
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

        await AuditLogger.log({
          action: 'PAYMENT_COMPLETED',
          entity: 'Order',
          entityId: orderId,
          changes: {
            orderNumber: order.orderNumber,
            totalPaid,
            inventoryAdjustments: inventoryChanges,
          },
          severity: 'CRITICAL',
          message: `Pago completado: ${order.orderNumber} - Vendedor: ${req.user.name} - Total pagado: $${totalPaid}`,
          userId: req.user.id,
        });
      } else {
        await AuditLogger.log({
          action: 'PAYMENT_ADDED',
          entity: 'Order',
          entityId: orderId,
          changes: {
            orderNumber: order.orderNumber,
            amount,
            totalPaid,
            remainingBalance,
          },
          severity: 'INFO',
          message: `Abono registrado: ${order.orderNumber} - Vendedor: ${req.user.name} - Monto: $${amount} - Restante: $${remainingBalance}`,
          userId: req.user.id,
        });
      }

      return updatedOrder;
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error adding payment:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getVendorSales = async (req: any, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {
      createdById: req.user.id,
    };

    if (startDate) {
      where.createdAt = { gte: new Date(startDate as string) };
    }

    if (endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(endDate as string) };
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalPaid = orders.filter(o => o.isPaid).reduce((sum, order) => sum + order.total, 0);

    res.json({
      sales: orders,
      stats: {
        totalOrders: orders.length,
        totalSales,
        totalPaid,
        pendingPayments: totalSales - totalPaid,
      },
    });
  } catch (error) {
    console.error('Error getting vendor sales:', error);
    res.status(500).json({ error: 'Error fetching sales' });
  }
};