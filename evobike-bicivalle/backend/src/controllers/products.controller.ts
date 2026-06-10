import type { Request, Response } from 'express';
import { catalogService } from '../services/catalog.service.js';
import type { ApiError, ApiSuccess } from '../types/api.types.js';
import type { CatalogFilters, UnifiedProduct } from '../types/product.types.js';

export const getGroupBySlug = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { slug } = req.params;
    const group = await catalogService.getGroupBySlug(slug);
    if (!group) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    return res.json({ success: true, data: group });
  } catch (error) {
    console.error('Error fetching group:', error);
    return res.status(500).json({ success: false, error: 'Failed to load product' });
  }
};

export const listGroupedProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const category = typeof req.query.category === 'string'
      ? req.query.category
      : undefined;

    const products = await catalogService.getGroupedProducts(category);

    return res.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error listing grouped products:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load grouped catalog',
    });
  }
};

const parseBoolean = (value: unknown): boolean | undefined => {
  if (value === 'true' || value === true) {
    return true;
  }

  if (value === 'false' || value === false) {
    return false;
  }

  return undefined;
};

export const listProducts = async (
  req: Request,
  res: Response<ApiSuccess<UnifiedProduct[]> | ApiError>
): Promise<Response<ApiSuccess<UnifiedProduct[]> | ApiError>> => {
  try {
    const minPrice = typeof req.query.minPrice === 'string' ? Number(req.query.minPrice) : undefined;
    const maxPrice = typeof req.query.maxPrice === 'string' ? Number(req.query.maxPrice) : undefined;

    const filters: CatalogFilters = {
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      inStock: parseBoolean(req.query.inStock),
      minPrice: Number.isFinite(minPrice ?? NaN) ? minPrice : undefined,
      maxPrice: Number.isFinite(maxPrice ?? NaN) ? maxPrice : undefined,
      category: typeof req.query.category === 'string' ? req.query.category : undefined,
    };

    const products = await catalogService.getAll(filters);

    return res.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error listing products:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load catalog',
    });
  }
};

export const getProductByCode = async (
  req: Request,
  res: Response<ApiSuccess<UnifiedProduct> | ApiError>
): Promise<Response<ApiSuccess<UnifiedProduct> | ApiError>> => {
  try {
    const { code } = req.params;
    const product = await catalogService.getByCode(code);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error loading product:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load product',
    });
  }
};