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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{categoryTitle}</h1>
          <p className="text-xl text-gray-600">{products.length} productos encontrados</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Filtros</h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Buscar
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre del producto"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Disponibilidad
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value="all"
                      checked={stockFilter === 'all'}
                      onChange={(e) => setStockFilter(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-900 font-medium">Todos</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value="inStock"
                      checked={stockFilter === 'inStock'}
                      onChange={(e) => setStockFilter(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-900 font-medium">En stock</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="stock"
                      value="outOfStock"
                      checked={stockFilter === 'outOfStock'}
                      onChange={(e) => setStockFilter(e.target.value)}
                      className="w-5 h-5 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-900 font-medium">Agotado</span>
                  </label>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Rango de precio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white font-medium"
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
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors text-lg"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border-2 border-gray-200">
                <p className="text-2xl font-bold text-gray-900 mb-2">No se encontraron productos</p>
                <p className="text-gray-600">Intenta con otros filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;