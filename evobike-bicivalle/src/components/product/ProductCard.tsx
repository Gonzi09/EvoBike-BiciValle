import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-primary-surface rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-900">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-accent-fuchsia text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <span className="text-text-primary font-semibold text-lg">Agotado</span>
            </div>
          )}

          {/* Quick View Button */}
          {onQuickView && product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="absolute top-3 right-3 bg-primary-bg bg-opacity-90 text-text-primary p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent-fuchsia"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-text-primary font-semibold text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-secondary bg-primary-green-dark bg-opacity-30 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-heading font-bold text-primary-green-bright">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Actions */}
          {product.inStock && (
            <div className="flex gap-2">
              <Link
                to={`/product/${product.id}`}
                className="flex-1 bg-primary-green-dark text-text-primary py-2 px-4 rounded-lg text-center text-sm font-medium hover:bg-primary-green-hover transition-colors duration-200"
              >
                Ver detalles
              </Link>
              <button
                onClick={handleAddToCart}
                className="bg-accent-fuchsia text-white p-2 rounded-lg hover:bg-accent-fuchsia-hover transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;