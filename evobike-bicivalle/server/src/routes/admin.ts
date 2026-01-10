import express from 'express';
import {
  getOrders,
  updateOrderStatus,
  updateProductInventory,
  getNotifications,
  markNotificationAsRead,
  getStats,
  getAuditLogs,
  getEntityAuditLogs,
} from '../controllers/adminController.js';
import { authenticate, requireRole, requirePermission, verifyMasterPassword } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas de admin requieren autenticación
router.use(authenticate);

// Orders - Admin o quien tenga permiso
router.get('/orders', requirePermission('canManageOrders'), getOrders);
router.patch('/orders/:id', requirePermission('canManageOrders'), updateOrderStatus);

// Inventory - Admin o quien tenga permiso
router.patch('/products/:id/inventory', requirePermission('canManageInventory'), updateProductInventory);

// Notifications - Solo admin
router.get('/notifications', requireRole('ADMIN'), getNotifications);
router.patch('/notifications/:id/read', requireRole('ADMIN'), markNotificationAsRead);

// Stats - Admin o quien tenga permiso de reportes
router.get('/stats', requirePermission('canViewReports'), getStats);

// Audit Logs - Solo admin
router.get('/audit-logs', requireRole('ADMIN'), getAuditLogs);
router.get('/audit-logs/:entity/:entityId', requireRole('ADMIN'), getEntityAuditLogs);

export default router;