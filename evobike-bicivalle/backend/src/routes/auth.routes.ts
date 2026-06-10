import { Router } from 'express';
import { UserRole } from '@prisma/client';
import { authenticate, requireRole } from '../middleware/auth.js';
import { login, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', authenticate, requireRole(UserRole.ADMIN), register);

export default router;