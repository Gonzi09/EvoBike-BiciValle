import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-80 bg-white flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.badge && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
            {product.badge}
          </div>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
            <span className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg text-lg shadow-xl">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="p-6 bg-white">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-3xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
          
          {product.inStock && (
            <span className="text-base text-green-600 font-bold group-hover:translate-x-1 transition-transform">
              Ver detalles →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;