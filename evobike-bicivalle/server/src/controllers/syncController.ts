import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { siigoService } from '../services/siigoService.js';
import { AuditLogger } from '../utils/auditLogger.js';

const prisma = new PrismaClient();

export const syncInventoryFromSiigo = async (req: any, res: Response) => {
  try {
    const siigoProducts = await siigoService.syncInventoryFromSiigo();
    
    let updated = 0;
    let notFound = 0;

    for (const siigoProduct of siigoProducts.results || []) {
      const localProduct = await prisma.product.findUnique({
        where: { siigoCode: siigoProduct.code }
      });

      if (localProduct) {
        const oldInventory = localProduct.inventoryCount;
        const newInventory = siigoProduct.available_quantity || 0;

        await prisma.product.update({
          where: { id: localProduct.id },
          data: {
            inventoryCount: newInventory,
            price: siigoProduct.prices?.[0]?.price_list?.[0]?.value || localProduct.price
          }
        });

        await AuditLogger.log({
          action: 'SYNC_INVENTORY_FROM_SIIGO',
          entity: 'Product',
          entityId: localProduct.id,
          changes: {
            siigoCode: siigoProduct.code,
            oldInventory,
            newInventory,
            difference: newInventory - oldInventory
          },
          severity: 'INFO',
          message: `Inventario sincronizado desde Siigo: ${localProduct.name} - ${oldInventory} → ${newInventory}`,
          userId: req.user?.id
        });

        updated++;
      } else {
        notFound++;
      }
    }

    res.json({
      message: 'Sincronización completada',
      updated,
      notFound,
      total: siigoProducts.results?.length || 0
    });
  } catch (error: any) {
    console.error('Error sincronizando:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getInventoryStatus = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || !product.siigoCode) {
      return res.json({
        local: product?.inventoryCount || 0,
        siigo: null,
        synced: false
      });
    }

    const siigoProduct = await siigoService.getProductByCode(product.siigoCode);

    res.json({
      local: product.inventoryCount,
      siigo: siigoProduct.available_quantity || 0,
      synced: product.inventoryCount === (siigoProduct.available_quantity || 0),
      siigoData: siigoProduct
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};