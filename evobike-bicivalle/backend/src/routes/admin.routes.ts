import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, requireRole } from '../middleware/auth.js';
import {
  deleteProductImages,
  listProducts,
  listProductCategories,
  syncSiigoHealth,
  upsertProductImages,
  upsertProductCategory,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(authenticate);
router.use(requireRole(UserRole.ADMIN));

router.get('/products', listProducts);
router.get('/products/categories', listProductCategories);
router.post('/products/:code/images', upsertProductImages);
router.delete('/products/:code/images', deleteProductImages);
router.post('/products/:code/category', upsertProductCategory);
router.get('/sync', syncSiigoHealth);

export default router;