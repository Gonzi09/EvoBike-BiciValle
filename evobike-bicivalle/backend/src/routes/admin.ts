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
import { syncInventoryFromSiigo, getInventoryStatus } from '../controllers/syncController.js';

const router = express.Router();

router.get('/orders', getOrders);
router.patch('/orders/:id', updateOrderStatus);
router.patch('/products/:id/inventory', updateProductInventory);
router.get('/notifications', getNotifications);
router.patch('/notifications/:id/read', markNotificationAsRead);
router.get('/stats', getStats);
router.get('/audit-logs', getAuditLogs);
router.get('/audit-logs/:entity/:entityId', getEntityAuditLogs);

router.post('/sync-inventory', syncInventoryFromSiigo);
router.get('/inventory-status/:id', getInventoryStatus);

export default router;