import type { SiigoProduct } from './siigo.types.js';

export interface UnifiedProduct {
  id: string;
  code: string;
  name: string;
  price: number;
  available_quantity: number;
  inStock: boolean;
  description: string;
  brand: string;
  model: string;
  reference: string;
  images: string[];
  taxes: SiigoProduct['taxes'];
  tax_included: boolean;
  warehouses: SiigoProduct['warehouses'];
  category: string | null;
}

export interface CatalogFilters {
  search?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

export interface ProductImageRecord {
  id: string;
  siigoCode: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}