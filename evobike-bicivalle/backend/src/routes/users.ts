import express from 'express';
import { getUsers, updateUser, deleteUser, resetPassword } from '../controllers/userController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(requireRole('ADMIN'));

router.get('/', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/:id/reset-password', resetPassword);

export default router;