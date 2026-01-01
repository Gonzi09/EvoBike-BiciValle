import express from 'express';
import { createOrder, confirmPayment, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/:id/confirm-payment', confirmPayment);
router.get('/:id', getOrderById);

export default router;