import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      inStock,
      minPrice,
      maxPrice,
      search,
      sortBy,
      page = '1',
      limit = '12',
    } = req.query;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (inStock === 'true') {
      where.inventoryCount = { gt: 0 };
    } else if (inStock === 'false') {
      where.inventoryCount = 0;
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice as string) };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice as string) };
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { tags: { has: search as string } },
      ];
    }

    let orderBy: any = { createdAt: 'desc' };

    if (sortBy === 'price-asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price-desc') {
      orderBy = { price: 'desc' };
    } else if (sortBy === 'popular') {
      orderBy = { popular: 'desc' };
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    const productsWithStock = products.map(p => ({
      ...p,
      inStock: p.inventoryCount > 0,
    }));

    res.json({
      products: productsWithStock,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      ...product,
      inStock: product.inventoryCount > 0,
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};