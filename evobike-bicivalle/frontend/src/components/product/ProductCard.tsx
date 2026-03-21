import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productUrl = product?.id ? `/product/${product.id}` : '/bicicletas';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={productUrl}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card-hover transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-72 bg-gray-50 flex items-center justify-center p-8 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full w-auto object-contain group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />

        {product.badge && (
          <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#0B1220] text-white text-xs font-semibold rounded-full tracking-wide">
            {product.badge}
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-6 py-5 border-t border-gray-100">
        <h3 className="text-base font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#2E9ED4] transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          {product.inStock && (
            <span className="text-xs text-[#2E9ED4] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              Ver más →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
