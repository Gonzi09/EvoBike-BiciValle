import { catalogService } from './catalog.service.js';
import type { CheckoutItemInput, ValidatedCheckoutItem } from '../types/invoice.types.js';

export class InventoryServiceError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'InventoryServiceError';
    this.statusCode = statusCode;
  }
}

export class InventoryService {
  async validateCheckoutItems(items: CheckoutItemInput[]): Promise<ValidatedCheckoutItem[]> {
    const validatedItems: ValidatedCheckoutItem[] = [];

    for (const item of items) {
      if (!item.siigoCode.trim()) {
        throw new InventoryServiceError('Every item requires a siigoCode', 400);
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new InventoryServiceError(`Invalid quantity for ${item.siigoCode}`, 400);
      }

      const product = await catalogService.getByCode(item.siigoCode);

      if (!product) {
        throw new InventoryServiceError(`Product not found: ${item.siigoCode}`, 404);
      }

      if (product.available_quantity < item.quantity) {
        throw new InventoryServiceError(
          `Stock insufficient for ${product.name}. Available: ${product.available_quantity}`,
          400
        );
      }

      const primaryTax = product.taxes[0];

      validatedItems.push({
        siigoCode: product.code,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
        taxId: primaryTax?.id,
        taxPercentage: primaryTax?.percentage,
        taxIncluded: product.tax_included,
      });
    }

    return validatedItems;
  }

  async getSyncSnapshot(): Promise<{ count: number }> {
    const products = await catalogService.getAll();
    return { count: products.length };
  }
}

export const inventoryService = new InventoryService();