import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { products } from '../data/products';
import { Filters, Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import FiltersPanel from '../components/product/FiltersPanel';

const Collection: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filters, setFilters] = useState<Filters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by category from URL
    if (category) {
      const categoryMap: Record<string, string> = {
        bicicletas: 'bicicleta',
        scooters: 'scooter',
        triciclos: 'triciclo',
      };
      const categoryFilter = categoryMap[category];
      if (categoryFilter) {
        result = result.filter((p) => p.category === categoryFilter);
      }
    }

    // Filter by stock
    if (filters.inStock !== undefined) {
      result = result.filter((p) => p.inStock === filters.inStock);
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result = [...result].sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result = [...result].sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          result = [...result].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
          break;
        case 'newest':
          result = [...result].sort((a, b) => (b.badge === 'Nuevo' ? 1 : 0) - (a.badge === 'Nuevo' ? 1 : 0));
          break;
      }
    }

    return result;
  }, [category, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryTitle = () => {
    const titles: Record<string, string> = {
      bicicletas: 'Bicicletas Eléctricas',
      scooters: 'Scooters Eléctricos',
      triciclos: 'Triciclos Eléctricos',
    };
    return category ? titles[category] || 'Productos' : 'Todos los Productos';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-text-secondary">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado
            {filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FiltersPanel filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center space-x-2 bg-primary-surface text-text-primary px-4 py-2 rounded-lg hover:bg-primary-green-dark transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span>Filtros</span>
              </button>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-primary-surface text-text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-green-dark transition-colors duration-200"
                    >
                      Anterior
                    </button>
                    
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg transition-colors duration-200 ${
                            currentPage === page
                              ? 'bg-accent-fuchsia text-white'
                              : 'bg-primary-surface text-text-primary hover:bg-primary-green-dark'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-primary-surface text-text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-green-dark transition-colors duration-200"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-secondary text-lg">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-4 text-accent-fuchsia hover:text-accent-fuchsia-hover font-medium"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={() => setShowFilters(false)}
          ></div>
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-primary-bg p-6 overflow-y-auto">
            <FiltersPanel
              filters={filters}
              onFilterChange={setFilters}
              onClose={() => setShowFilters(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;