import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuditLogger } from '../utils/auditLogger.js';

const prisma = new PrismaClient();

export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const {
      siigoCode,
      images,
      description,
      tags,
      specs,
      variants,
      batteryType,
      batteryOptions,
      badge,
      popular
    } = req.body;

    const oldProduct = await prisma.product.findUnique({ where: { id } });
    
    if (!oldProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        siigoCode,
        images,
        description,
        tags,
        specs,
        variants,
        batteryType,
        batteryOptions,
        badge,
        popular,
      },
    });

    await AuditLogger.log({
      action: 'PRODUCT_UPDATED',
      entity: 'Product',
      entityId: product.id,
      changes: {
        before: oldProduct,
        after: product,
      },
      severity: 'INFO',
      message: `Producto actualizado: ${product.name}`,
      userId: req.user?.id,
    });

    res.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
};