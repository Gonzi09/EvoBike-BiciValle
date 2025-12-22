import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/product/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = id ? getProductById(id) : undefined;
  const relatedProducts = product ? getRelatedProducts(product) : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">
            Producto no encontrado
          </h2>
          <Link to="/" className="text-accent-fuchsia hover:text-accent-fuchsia-hover">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (product.inStock) {
      addItem(product, quantity, selectedVariant);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to={`/${product.category === 'bicicleta' ? 'bicicletas' : product.category === 'scooter' ? 'scooters' : 'triciclos'}`}
          className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary-green-bright mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a la colección</span>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <div className="bg-primary-surface rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-primary-surface rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImage === index
                        ? 'border-accent-fuchsia'
                        : 'border-transparent hover:border-primary-green-bright'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-accent-fuchsia text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}
            
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-text-secondary bg-primary-green-dark bg-opacity-30 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-4xl font-heading font-bold text-primary-green-bright mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-text-secondary mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center space-x-2 text-primary-green-bright">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">En stock</span>
                </div>
              ) : (
                <div className="text-text-muted font-medium">Agotado</div>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-text-primary font-medium mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedVariant(variant.color)}
                      disabled={!variant.available}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedVariant === variant.color
                          ? 'border-accent-fuchsia bg-accent-fuchsia bg-opacity-10 text-accent-fuchsia'
                          : variant.available
                          ? 'border-gray-700 text-text-primary hover:border-primary-green-bright'
                          : 'border-gray-800 text-text-muted cursor-not-allowed opacity-50'
                      }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {product.inStock && (
              <div className="mb-8">
                <label className="block text-text-primary font-medium mb-3">
                  Cantidad
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-primary-surface rounded-lg text-text-primary hover:bg-primary-green-dark transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="text-text-primary font-medium text-lg w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-primary-surface rounded-lg text-text-primary hover:bg-primary-green-dark transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="w-full bg-accent-fuchsia text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-fuchsia-hover transition-all duration-200 hover:shadow-glow-fuchsia flex items-center justify-center space-x-2 mb-4"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{addedToCart ? '¡Agregado al carrito!' : 'Agregar al carrito'}</span>
              </button>
            )}

            <Link
              to="/cart"
              className="block w-full bg-primary-green-dark text-text-primary py-4 rounded-lg font-semibold text-center hover:bg-primary-green-hover transition-colors duration-200"
            >
              Ver carrito
            </Link>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-primary-surface rounded-lg p-8 mb-20">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
            Especificaciones Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between py-3 border-b border-gray-800">
                <span className="text-text-secondary">{spec.label}</span>
                <span className="text-text-primary font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-8">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;