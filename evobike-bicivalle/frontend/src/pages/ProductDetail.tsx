import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { fetchProductById } from '../utils/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedBattery, setSelectedBattery] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id!);
      setProduct(data);
      
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
        setCurrentImage(data.variants[0].image);
      } else {
        setCurrentImage(data.images[0]);
      }

      if (data.batteryOptions && data.batteryOptions.length > 0) {
        setSelectedBattery(data.batteryOptions[0].type);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Producto no encontrado</h2>
          <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    setCurrentImage(variant.image);
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant?.color, selectedBattery);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const backToCategory = product?.category ? `/${product.category}` : '/bicicletas';

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={backToCategory}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 font-medium text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a la colección
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8 flex items-center justify-center">
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          <div>
            {product.badge && (
              <span className="inline-block px-4 py-2 bg-pink-500 text-white text-sm font-bold rounded-full mb-4">
                {product.badge}
              </span>
            )}

            <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">
              BICICLETAS ELÉCTRICAS
            </p>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-4xl font-bold text-green-600 mb-8">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-600 font-semibold mb-8 text-lg">
                <Check className="w-6 h-6" />
                En stock
              </div>
            ) : (
              <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg mb-8">
                <p className="text-red-800 font-bold text-lg">Producto agotado</p>
              </div>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Color
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.color}
                      onClick={() => handleVariantChange(variant)}
                      disabled={!variant.available}
                      className={`px-6 py-4 border-2 rounded-lg font-semibold transition-all text-left ${
                        selectedVariant?.color === variant.color
                          ? 'border-green-600 bg-green-50 text-green-700 ring-2 ring-green-200'
                          : variant.available
                          ? 'border-gray-300 text-gray-900 hover:border-gray-500 bg-white'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.batteryType && (
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Tipo de Batería
                </label>
                <div className="px-6 py-4 bg-gray-100 border-2 border-gray-300 rounded-lg">
                  <p className="text-gray-900 font-semibold">{product.batteryType}</p>
                </div>
              </div>
            )}

            {product.batteryOptions && product.batteryOptions.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Opciones de Batería
                </label>
                <div className="space-y-2">
                  {product.batteryOptions.map((option: any, index: number) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 px-6 py-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-white"
                    >
                      <input
                        type="radio"
                        name="battery"
                        value={option.type}
                        checked={selectedBattery === option.type}
                        onChange={(e) => setSelectedBattery(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-900 font-medium">{option.type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-14 h-14 bg-gray-900 text-white rounded-lg font-bold text-2xl hover:bg-gray-800 transition-colors"
                >
                  -
                </button>
                <span className="text-3xl font-bold text-gray-900 w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-14 h-14 bg-gray-900 text-white rounded-lg font-bold text-2xl hover:bg-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || addedToCart}
              className={`w-full py-5 rounded-lg font-bold text-xl transition-all flex items-center justify-center gap-3 ${
                !product.inStock
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {!product.inStock
                ? 'Producto Agotado'
                : addedToCart
                ? 'Agregado al Carrito'
                : 'Agregar al carrito'}
            </button>

            {product.specs && product.specs.length > 0 && (
              <div className="mt-12 border-t-2 border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Especificaciones Técnicas
                </h3>
                <div className="space-y-4">
                  {product.specs.map((spec: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between py-4 border-b border-gray-200"
                    >
                      <span className="font-bold text-gray-900 text-lg">{spec.label}</span>
                      <span className="text-gray-800 text-lg">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;