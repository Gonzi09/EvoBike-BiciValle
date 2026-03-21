import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../utils/api';

const Collection: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    loadProducts();
  }, [category, searchTerm, priceRange, stockFilter, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const filters: any = { limit: '100' };

      if (category) filters.category = category;
      if (searchTerm) filters.search = searchTerm;
      if (priceRange.min) filters.minPrice = priceRange.min;
      if (priceRange.max) filters.maxPrice = priceRange.max;
      if (stockFilter === 'inStock') filters.inStock = 'true';
      if (stockFilter === 'outOfStock') filters.inStock = 'false';
      if (sortBy !== 'featured') filters.sortBy = sortBy;

      const data = await fetchProducts(filters);
      setProducts(data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1) + 's'
    : 'Todos los Productos';

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0B1220]">
        <div className="w-10 h-10 border-4 border-[#2E9ED4] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#9CA3AF] text-sm">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">{categoryTitle}</h1>
          <p className="text-[#9CA3AF]">{products.length} productos encontrados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Filters Sidebar ── */}
          <aside className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#F9FAFB] mb-6">Filtros</h2>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre del producto"
                  className="input-glass w-full text-sm"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-3">
                  Disponibilidad
                </label>
                <div className="space-y-2.5">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'inStock', label: 'En stock' },
                    { value: 'outOfStock', label: 'Agotado' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="stock"
                        value={opt.value}
                        checked={stockFilter === opt.value}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="w-4 h-4 accent-[#2E9ED4]"
                      />
                      <span className="text-[#F9FAFB] text-sm font-medium group-hover:text-[#2E9ED4] transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">
                  Rango de precio
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="input-glass text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="input-glass text-sm"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest mb-2">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-glass w-full text-sm appearance-none cursor-pointer"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setPriceRange({ min: '', max: '' });
                  setStockFilter('all');
                  setSortBy('featured');
                }}
                className="btn-premium w-full"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-20 glass rounded-2xl border border-[#2E9ED4]/20">
                <div className="w-16 h-16 bg-[#111827] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-lg font-bold text-[#F9FAFB] mb-1">No se encontraron productos</p>
                <p className="text-[#9CA3AF] text-sm">Intenta con otros filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
