import express from 'express';
import { refundOrder, cancelOrder } from '../controllers/criticalOpsController.js';
import { authenticate, requireRole, verifyMasterPassword } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole('ADMIN'));

router.post('/refund/:id', verifyMasterPassword, refundOrder);
router.post('/cancel/:id', verifyMasterPassword, cancelOrder);

export default router;