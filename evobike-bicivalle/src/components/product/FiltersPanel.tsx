import React from 'react';
import { X, Search } from 'lucide-react';
import { Filters } from '../../types';

interface FiltersPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  onClose,
  isMobile = false,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleStockChange = (inStock: boolean | undefined) => {
    onFilterChange({ ...filters, inStock });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    onFilterChange({
      ...filters,
      [type === 'min' ? 'minPrice' : 'maxPrice']: numValue,
    });
  };

  const handleSortChange = (sortBy: Filters['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className={`bg-primary-surface rounded-lg ${isMobile ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-primary font-heading font-semibold text-lg">Filtros</h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Buscar
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={handleSearchChange}
            placeholder="Nombre del producto..."
            className="w-full pl-10 pr-4 py-2 bg-primary-bg border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
          />
        </div>
      </div>

      {/* Stock Filter */}
      <div className="mb-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Disponibilidad
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.inStock === undefined}
              onChange={() => handleStockChange(undefined)}
              className="w-4 h-4 text-accent-fuchsia focus:ring-accent-fuchsia"
            />
            <span className="ml-2 text-text-primary text-sm">Todos</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.inStock === true}
              onChange={() => handleStockChange(true)}
              className="w-4 h-4 text-accent-fuchsia focus:ring-accent-fuchsia"
            />
            <span className="ml-2 text-text-primary text-sm">En stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={filters.inStock === false}
              onChange={() => handleStockChange(false)}
              className="w-4 h-4 text-accent-fuchsia focus:ring-accent-fuchsia"
            />
            <span className="ml-2 text-text-primary text-sm">Agotado</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Rango de precio
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              placeholder="Mín"
              className="w-full px-3 py-2 bg-primary-bg border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
            />
          </div>
          <div>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              placeholder="Máx"
              className="w-full px-3 py-2 bg-primary-bg border border-gray-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Ordenar por
        </label>
        <select
          value={filters.sortBy || ''}
          onChange={(e) => handleSortChange(e.target.value as Filters['sortBy'])}
          className="w-full px-3 py-2 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200"
        >
          <option value="">Predeterminado</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="popular">Más Popular</option>
          <option value="newest">Más Nuevos</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2 px-4 bg-primary-green-dark text-text-primary rounded-lg text-sm font-medium hover:bg-primary-green-hover transition-colors duration-200"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default FiltersPanel;