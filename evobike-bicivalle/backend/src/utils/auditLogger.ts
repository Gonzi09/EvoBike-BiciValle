import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

interface LogParams {
  action: string;
  entity: string;
  entityId: string;
  changes?: any;
  metadata?: any;
  severity?: LogSeverity;
  message: string;
}

export class AuditLogger {
  static async log({
    action,
    entity,
    entityId,
    changes = null,
    metadata = null,
    severity = 'INFO',
    message,
  }: LogParams) {
    try {
      await prisma.auditLog.create({
        data: {
          action,
          entity,
          entityId,
          changes,
          metadata: {
            ...metadata,
            timestamp: new Date().toISOString(),
            userAgent: metadata?.userAgent || 'system',
          },
          severity,
          message,
        },
      });

      const emoji = {
        INFO: '📝',
        WARNING: '⚠️',
        ERROR: '❌',
        CRITICAL: '🚨',
      }[severity];

      console.log(`${emoji} [AUDIT] ${action}: ${message}`);
    } catch (error) {
      console.error('Failed to create audit log:', error);
    }
  }

  static async logOrderCreated(order: any, metadata?: any) {
    await this.log({
      action: 'CREATE_ORDER',
      entity: 'Order',
      entityId: order.id,
      changes: {
        orderNumber: order.orderNumber,
        total: order.total,
        itemCount: order.items?.length,
      },
      metadata,
      severity: 'INFO',
      message: `Orden creada: ${order.orderNumber} - Cliente: ${order.customerName}`,
    });
  }

  static async logPaymentConfirmed(order: any, inventoryChanges: any[], metadata?: any) {
    await this.log({
      action: 'CONFIRM_PAYMENT',
      entity: 'Order',
      entityId: order.id,
      changes: {
        orderNumber: order.orderNumber,
        previousStatus: 'PENDING_PAYMENT',
        newStatus: 'PAID',
        inventoryAdjustments: inventoryChanges,
      },
      metadata,
      severity: 'CRITICAL',
      message: `Pago confirmado: ${order.orderNumber} - Total: $${order.total} - Inventario ajustado para ${inventoryChanges.length} productos`,
    });
  }

  static async logInventoryUpdate(product: any, oldCount: number, newCount: number, metadata?: any) {
    const difference = newCount - oldCount;
    await this.log({
      action: 'UPDATE_INVENTORY',
      entity: 'Product',
      entityId: product.id,
      changes: {
        productName: product.name,
        previousCount: oldCount,
        newCount: newCount,
        difference: difference,
      },
      metadata,
      severity: difference < 0 ? 'WARNING' : 'INFO',
      message: `Inventario actualizado: ${product.name} - De ${oldCount} a ${newCount} (${difference > 0 ? '+' : ''}${difference})`,
    });
  }

  static async logOrderStatusChange(order: any, oldStatus: string, newStatus: string, metadata?: any) {
    await this.log({
      action: 'UPDATE_ORDER_STATUS',
      entity: 'Order',
      entityId: order.id,
      changes: {
        orderNumber: order.orderNumber,
        previousStatus: oldStatus,
        newStatus: newStatus,
      },
      metadata,
      severity: 'INFO',
      message: `Estado de orden ${order.orderNumber} cambiado: ${oldStatus} → ${newStatus}`,
    });
  }

  static async logOversellAttempt(productId: string, productName: string, requested: number, available: number, metadata?: any) {
    await this.log({
      action: 'OVERSELL_PREVENTED',
      entity: 'Product',
      entityId: productId,
      changes: {
        productName,
        requested,
        available,
        prevented: true,
      },
      metadata,
      severity: 'CRITICAL',
      message: `⚠️ OVERSELLING PREVENIDO: ${productName} - Solicitado: ${requested}, Disponible: ${available}`,
    });
  }

  static async logOrderCanceled(order: any, inventoryReturned: any[], metadata?: any) {
    await this.log({
      action: 'CANCEL_ORDER',
      entity: 'Order',
      entityId: order.id,
      changes: {
        orderNumber: order.orderNumber,
        inventoryReturned,
      },
      metadata,
      severity: 'WARNING',
      message: `Orden cancelada: ${order.orderNumber} - Inventario devuelto para ${inventoryReturned.length} productos`,
    });
  }

  static async logError(action: string, entity: string, entityId: string, error: any, metadata?: any) {
    await this.log({
      action: `${action}_ERROR`,
      entity,
      entityId,
      changes: {
        error: error.message,
        stack: error.stack,
      },
      metadata,
      severity: 'ERROR',
      message: `Error en ${action}: ${error.message}`,
    });
  }
}