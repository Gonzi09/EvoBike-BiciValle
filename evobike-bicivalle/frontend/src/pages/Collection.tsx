import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { fetchGroupedProducts } from '../utils/api';

const Collection: React.FC = () => {
  const location = useLocation();
  const category = location.pathname.includes('bicicletas') ? 'bicicleta'
    : location.pathname.includes('scooters') ? 'scooter'
    : location.pathname.includes('triciclos') ? 'triciclo'
    : undefined;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [category, searchTerm, priceRange, stockFilter, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchGroupedProducts(category);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = location.pathname.includes('bicicletas') ? 'Bicicletas Eléctricas'
    : location.pathname.includes('scooters') ? 'Scooters Eléctricos'
    : location.pathname.includes('triciclos') ? 'Triciclos Eléctricos'
    : 'Todos los Productos';

  const renderFilters = (mobile: boolean) => (
    <div className={mobile ? 'w-full' : 'rounded-lg p-4 sticky top-24 bg-white border border-[#E2E8F0] shadow-sm max-w-sm'}>
      {mobile ? (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0B1220]">Filtros</h2>
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="w-9 h-9 rounded-md flex items-center justify-center text-[#6B7280] hover:text-[#0B1220] hover:bg-[#F7F9FC] transition-colors"
            aria-label="Cerrar filtros"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <h2 className="text-lg font-bold text-[#0B1220] mb-3">Filtros</h2>
      )}

      <div className="mb-3.5">
        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
          Buscar
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nombre del producto"
          className="w-full text-sm px-3 py-1.5 border border-[#E2E8F0] rounded bg-[#F9FAFB] text-[#0B1220] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2E9ED4] transition-all"
        />
      </div>

      <div className="mb-3.5">
        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
          Disponibilidad
        </label>
        <div className="space-y-1.5">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'inStock', label: 'En stock' },
            { value: 'outOfStock', label: 'Agotado' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group px-1 py-0.5 rounded hover:bg-[#F7F9FC] transition-colors">
              <input
                type="radio"
                name="stock"
                value={opt.value}
                checked={stockFilter === opt.value}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-4 h-4 accent-[#2E9ED4] cursor-pointer flex-shrink-0"
              />
              <span className="text-[#0B1220] text-sm font-medium group-hover:text-[#2E9ED4] transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-3.5">
        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
          Rango de precio
        </label>
        <div className="flex gap-2 w-full">
          <input
            type="number"
            placeholder="Mín"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="flex-1 min-w-0 text-sm px-3 py-1.5 border border-[#E2E8F0] rounded bg-[#F9FAFB] text-[#0B1220] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2E9ED4] transition-all"
          />
          <input
            type="number"
            placeholder="Máx"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="flex-1 min-w-0 text-sm px-3 py-1.5 border border-[#E2E8F0] rounded bg-[#F9FAFB] text-[#0B1220] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2E9ED4] transition-all"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
          Ordenar por
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-sm px-3 py-1.5 border border-[#E2E8F0] rounded bg-[#F9FAFB] text-[#0B1220] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2E9ED4] transition-all"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%236B7280%22 viewBox=%220 0 20 20%22%3E%3Cpath fill-rule=%22evenodd%22 d=%22M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%22 clip-rule=%22evenodd%22/%3E%3C/svg%3E")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', backgroundSize: '14px', paddingRight: '24px' }}
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
        className="w-full bg-[#2E9ED4] text-white px-3 py-2 rounded font-semibold text-sm hover:bg-[#00BFFF] active:scale-95 transition-all duration-200"
      >
        Limpiar filtros
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F7F9FC]">
        <div className="w-10 h-10 border-4 border-[#2E9ED4] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#6B7280] text-lg font-medium">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0B1220] mb-3">{categoryTitle}</h1>
          <p className="text-[#6B7280] text-lg font-medium">{(products ?? []).length} productos encontrados</p>
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          className="lg:hidden w-full bg-[#2E9ED4] text-white rounded-lg px-3 py-3 mb-4 flex items-center justify-center gap-2"
          style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}
        >
          <span className="text-lg leading-none">≡</span>
          <span>Filtrar y ordenar</span>
        </button>

        {filtersOpen && (
          <div className="lg:hidden mb-4 w-full">
            <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm p-4">
              {renderFilters(true)}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Filters Sidebar ── */}
          <aside className="hidden lg:block lg:col-span-1">
            {renderFilters(false)}
          </aside>

          {/* ── Product Grid ── */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {(products ?? []).map((product) => (
                <ProductCard key={product.slug ?? product.id} product={product} />
              ))}
            </div>

            {(products ?? []).length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0]">
                <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <p className="text-2xl font-bold text-[#0B1220] mb-2">No se encontraron productos</p>
                <p className="text-[#6B7280] text-base font-medium">Intenta con otros filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
