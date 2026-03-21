import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { updateProduct } from '../controllers/productAdminController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id', authenticate, requireRole('ADMIN'), updateProduct);

export default router;