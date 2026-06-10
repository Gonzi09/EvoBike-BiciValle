import { Router } from 'express';
import { getGroupBySlug, getProductByCode, listGroupedProducts, listProducts } from '../controllers/products.controller.js';

const router = Router();

router.get('/', listProducts);
router.get('/grouped', listGroupedProducts);
router.get('/group/:slug', getGroupBySlug);
router.get('/:code', getProductByCode);

export default router;