import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { siigoProvider } from '../providers/siigo.provider.js';
import { catalogService } from '../services/catalog.service.js';
import type { ApiError, ApiSuccess } from '../types/api.types.js';
import type { UnifiedProduct } from '../types/product.types.js';

interface ProductImagesBody {
  images?: string[];
}

interface ImageRecordResponse {
  id: string;
  siigoCode: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const listProducts = async (
  req: Request,
  res: Response<ApiSuccess<UnifiedProduct[]> | ApiError>
): Promise<Response<ApiSuccess<UnifiedProduct[]> | ApiError>> => {
  try {
    const minPrice = typeof req.query.minPrice === 'string' ? Number(req.query.minPrice) : undefined;
    const maxPrice = typeof req.query.maxPrice === 'string' ? Number(req.query.maxPrice) : undefined;

    const products = await catalogService.getAll({
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined,
      minPrice: Number.isFinite(minPrice ?? NaN) ? minPrice : undefined,
      maxPrice: Number.isFinite(maxPrice ?? NaN) ? maxPrice : undefined,
    });

    return res.json({
      success: true,
      data: products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error listing admin products:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load catalog',
    });
  }
};

export const upsertProductImages = async (
  req: Request,
  res: Response<ApiSuccess<ImageRecordResponse> | ApiError>
): Promise<Response<ApiSuccess<ImageRecordResponse> | ApiError>> => {
  try {
    const { code } = req.params;
    const body = req.body as ProductImagesBody;

    if (!Array.isArray(body.images) || body.images.some((image) => typeof image !== 'string')) {
      return res.status(400).json({
        success: false,
        error: 'images must be an array of strings',
      });
    }

    const product = await catalogService.getByCode(code);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found in Siigo',
      });
    }

    const imageRecord = await prisma.productImage.upsert({
      where: { siigoCode: code },
      update: { images: body.images },
      create: { siigoCode: code, images: body.images },
    });

    return res.json({
      success: true,
      data: imageRecord,
    });
  } catch (error) {
    console.error('Error upserting product images:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save images',
    });
  }
};

export const deleteProductImages = async (
  req: Request,
  res: Response<ApiSuccess<{ deleted: number }> | ApiError>
): Promise<Response<ApiSuccess<{ deleted: number }> | ApiError>> => {
  try {
    const { code } = req.params;

    const result = await prisma.productImage.deleteMany({
      where: { siigoCode: code },
    });

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        error: 'Image record not found',
      });
    }

    return res.json({
      success: true,
      data: { deleted: result.count },
    });
  } catch (error) {
    console.error('Error deleting product images:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete images',
    });
  }
};

export const syncSiigoHealth = async (
  _req: Request,
  res: Response<ApiSuccess<{ productsCount: number; timestamp: string }> | ApiError>
): Promise<Response<ApiSuccess<{ productsCount: number; timestamp: string }> | ApiError>> => {
  try {
    const products = await siigoProvider.getAllProducts();

    return res.json({
      success: true,
      data: {
        productsCount: products.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error checking Siigo health:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to contact Siigo',
    });
  }
};

interface ProductCategoryBody {
  category?: string;
}

interface ProductCategoryResponse {
  id: string;
  siigoCode: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const upsertProductCategory = async (
  req: Request,
  res: Response<ApiSuccess<ProductCategoryResponse> | ApiError>
): Promise<Response<ApiSuccess<ProductCategoryResponse> | ApiError>> => {
  try {
    const { code } = req.params;
    const body = req.body as ProductCategoryBody;

    if (typeof body.category !== 'string' || body.category.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'category must be a non-empty string',
      });
    }

    const product = await catalogService.getByCode(code);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found in Siigo',
      });
    }

    const productCategory = await prisma.productCategory.upsert({
      where: { siigoCode: code },
      update: { category: body.category.trim() },
      create: { siigoCode: code, category: body.category.trim() },
    });

    return res.json({
      success: true,
      data: productCategory,
    });
  } catch (error) {
    console.error('Error upserting product category:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save category',
    });
  }
};

export const listProductCategories = async (
  _req: Request,
  res: Response<ApiSuccess<ProductCategoryResponse[]> | ApiError>
): Promise<Response<ApiSuccess<ProductCategoryResponse[]> | ApiError>> => {
  try {
    const categories = await prisma.productCategory.findMany();
    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error listing product categories:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to load categories',
    });
  }
};