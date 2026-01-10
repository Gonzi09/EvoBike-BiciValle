import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuditLogger } from '../utils/auditLogger.js';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, isActive } = req.query;

    const where: any = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        canManageInventory: true,
        canManageOrders: true,
        canManageUsers: true,
        canViewReports: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      isActive,
      canManageInventory,
      canManageOrders,
      canManageUsers,
      canViewReports,
    } = req.body;

    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        role,
        isActive,
        canManageInventory,
        canManageOrders,
        canManageUsers,
        canViewReports,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        canManageInventory: true,
        canManageOrders: true,
        canManageUsers: true,
        canViewReports: true,
      },
    });

    await AuditLogger.log({
      action: 'USER_UPDATED',
      entity: 'User',
      entityId: id,
      changes: {
        from: {
          name: currentUser.name,
          role: currentUser.role,
          isActive: currentUser.isActive,
        },
        to: {
          name: updatedUser.name,
          role: updatedUser.role,
          isActive: updatedUser.isActive,
        },
      },
      severity: 'WARNING',
      message: `Usuario actualizado: ${updatedUser.name} por ${req.user.name}`,
      userId: req.user.id,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    await AuditLogger.log({
      action: 'USER_DEACTIVATED',
      entity: 'User',
      entityId: id,
      changes: {
        userName: user.name,
        deactivatedBy: req.user.name,
      },
      severity: 'WARNING',
      message: `Usuario desactivado: ${user.name} por ${req.user.name}`,
      userId: req.user.id,
    });

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

export const resetPassword = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    await AuditLogger.log({
      action: 'PASSWORD_RESET',
      entity: 'User',
      entityId: id,
      severity: 'WARNING',
      message: `Contraseña restablecida para: ${user.name} por ${req.user.name}`,
      userId: req.user.id,
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error resetting password' });
  }
};