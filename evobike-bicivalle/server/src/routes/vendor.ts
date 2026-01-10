import express from 'express';
import { createInPersonSale, addPaymentToOrder, getVendorSales } from '../controllers/vendorController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/sales', createInPersonSale);
router.post('/sales/:orderId/payment', addPaymentToOrder);
router.get('/my-sales', getVendorSales);

export default router;