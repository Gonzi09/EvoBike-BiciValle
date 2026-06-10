import { prisma } from '../config/prisma.js';
import { siigoProvider } from '../providers/siigo.provider.js';
import type { CatalogFilters, UnifiedProduct } from '../types/product.types.js';
import type { SiigoProduct } from '../types/siigo.types.js';

const extractPrice = (product: SiigoProduct): number => {
  if (!product.prices || product.prices.length === 0) return 0;
  const copPriceList = product.prices.find((p) => p.currency_code === 'COP');
  if (!copPriceList || !copPriceList.price_list || copPriceList.price_list.length === 0) return 0;
  const primary = copPriceList.price_list.find((pl) => pl.position === 1)?.value;
  const fallback = copPriceList.price_list[0]?.value;
  return primary ?? fallback ?? 0;
};

const normalize = (value: string | undefined): string => value?.trim().toLowerCase() ?? '';

const CATALOG_CACHE_TTL_MS = 300000;

interface CatalogCacheEntry {
  products: UnifiedProduct[];
  cachedAt: number;
}

let catalogCache: CatalogCacheEntry | null = null;

export class CatalogService {
  private mapProduct(product: SiigoProduct, images: string[], category: string | null = null): UnifiedProduct {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      price: extractPrice(product),
      available_quantity: product.available_quantity,
      inStock: product.available_quantity > 0,
      description: product.description,
      brand: product.additional_fields?.brand ?? '',
      model: product.additional_fields?.model ?? '',
      reference: product.reference,
      images,
      taxes: product.taxes,
      tax_included: product.tax_included,
      warehouses: product.warehouses,
      category,
    };
  }

  private applyFilters(products: UnifiedProduct[], filters: CatalogFilters): UnifiedProduct[] {
    const search = normalize(filters.search);

    return products.filter((product) => {
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.category !== undefined && product.category !== filters.category) {
        return false;
      }

      if (!search) {
        return true;
      }

      const haystack = [product.name, product.description, product.brand, product.model]
        .map(normalize)
        .join(' ');

      return haystack.includes(search);
    });
  }

  async getAll(filters: CatalogFilters = {}): Promise<UnifiedProduct[]> {
    const now = Date.now();

    if (catalogCache && now - catalogCache.cachedAt < CATALOG_CACHE_TTL_MS) {
      return this.applyFilters(catalogCache.products, filters);
    }

    const [siigoProducts, imageRecords, categoryRecords] = await Promise.all([
      siigoProvider.getAllProducts(),
      prisma.productImage.findMany(),
      prisma.productCategory.findMany(),
    ]);

    const imageMap = new Map(imageRecords.map((record) => [record.siigoCode, record.images]));
    const categoryMap = new Map(categoryRecords.map((record) => [record.siigoCode, record.category]));
    const products = siigoProducts
      .filter((product) => product.active)
      .map((product) => this.mapProduct(
        product,
        imageMap.get(product.code) ?? [],
        categoryMap.get(product.code) ?? null,
      ));

    catalogCache = {
      products,
      cachedAt: now,
    };

    return this.applyFilters(products, filters);
  }

  async getByCode(code: string): Promise<UnifiedProduct | null> {
    const [product, imageRecord, categoryRecord] = await Promise.all([
      siigoProvider.getProductByCode(code),
      prisma.productImage.findUnique({ where: { siigoCode: code } }),
      prisma.productCategory.findUnique({ where: { siigoCode: code } }),
    ]);

    if (!product) {
      return null;
    }

    return this.mapProduct(product, imageRecord?.images ?? [], categoryRecord?.category ?? null);
  }

  async getById(id: string): Promise<UnifiedProduct | null> {
    const [product, imageRecords, categoryRecords] = await Promise.all([
      siigoProvider.getProductById(id),
      prisma.productImage.findMany(),
      prisma.productCategory.findMany(),
    ]);

    if (!product) {
      return null;
    }

    const imageMap = new Map(imageRecords.map((record) => [record.siigoCode, record.images]));
    const categoryMap = new Map(categoryRecords.map((record) => [record.siigoCode, record.category]));
    return this.mapProduct(product, imageMap.get(product.code) ?? [], categoryMap.get(product.code) ?? null);
  }

  async warmCache(): Promise<void> {
    try {
      await this.getAll();
      console.log('Catalog cache warmed successfully');
    } catch (error) {
      console.error('Failed to warm catalog cache:', error);
    }
  }

  async getGroupBySlug(slug: string): Promise<any | null> {
    const group = await prisma.productGroup.findUnique({
      where: { slug },
      include: { variants: true },
    });
    if (!group) return null;

    const siigoProducts = await siigoProvider.getAllProducts();
    const siigoMap = new Map(siigoProducts.map((p) => [p.code, p]));

    const variants = group.variants.map((variant) => {
      const siigo = siigoMap.get(variant.siigoCode);
      const price = siigo ? extractPrice(siigo) : 0;
      const available_quantity = siigo?.available_quantity ?? 0;
      return {
        siigoCode: variant.siigoCode,
        colorLabel: variant.colorLabel,
        price,
        available_quantity,
        inStock: available_quantity > 0,
        images: variant.images,
        description: siigo?.description ?? '',
        brand: siigo?.additional_fields?.brand ?? '',
        model: siigo?.additional_fields?.model ?? '',
        taxes: siigo?.taxes ?? [],
        warehouses: siigo?.warehouses ?? [],
      };
    });

    const price = variants.find((v) => v.price > 0)?.price ?? 0;
    const inStock = variants.some((v) => v.inStock);
    const coverImage = variants.find((v) => v.images.length > 0)?.images[0] ?? null;

    return {
      slug: group.slug,
      displayName: group.displayName,
      category: group.category,
      description: group.description,
      price,
      inStock,
      coverImage,
      variants,
    };
  }

  async getGroupedProducts(category?: string): Promise<any[]> {
    const groups = await prisma.productGroup.findMany({
      where: category ? { category } : undefined,
      include: { variants: true },
    });

    const siigoProducts = await siigoProvider.getAllProducts();
    const siigoMap = new Map(siigoProducts.map((p) => [p.code, p]));

    return groups.map((group) => {
      const variants = group.variants.map((variant) => {
        const siigo = siigoMap.get(variant.siigoCode);
        const price = siigo ? extractPrice(siigo) : 0;
        const available_quantity = siigo?.available_quantity ?? 0;
        return {
          siigoCode: variant.siigoCode,
          colorLabel: variant.colorLabel,
          price,
          available_quantity,
          inStock: available_quantity > 0,
          images: variant.images,
        };
      });

      const price = variants.find((v) => v.price > 0)?.price ?? 0;
      const inStock = variants.some((v) => v.inStock);
      const coverImage = variants.find((v) => v.images.length > 0)?.images[0] ?? null;

      return {
        slug: group.slug,
        displayName: group.displayName,
        category: group.category,
        description: group.description,
        price,
        inStock,
        coverImage,
        variants,
      };
    });
  }
}

export const catalogService = new CatalogService();