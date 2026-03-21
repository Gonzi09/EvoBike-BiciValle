import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#2E9ED4] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Producto no encontrado</h2>
          <Link to="/" className="text-[#2E9ED4] hover:text-[#2589BB] font-semibold transition-colors">
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={backToCategory}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2E9ED4] mb-8 font-medium text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Volver a la colección
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ── Product Image ── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center shadow-card">
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full h-auto object-contain max-h-[500px]"
            />
          </div>

          {/* ── Product Info ── */}
          <div>
            {product.badge && (
              <span className="inline-block px-3 py-1.5 bg-[#2E9ED4] text-white text-xs font-bold rounded-full mb-4 tracking-wide">
                {product.badge}
              </span>
            )}

            <p className="text-[#2E9ED4] font-semibold text-xs uppercase tracking-widest mb-2">
              BICICLETAS ELÉCTRICAS
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mb-5 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-3xl font-bold text-[#2E9ED4] mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-7">
              {product.description}
            </p>

            {product.inStock ? (
              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold mb-7 text-sm bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                <Check className="w-4 h-4" />
                En stock
              </div>
            ) : (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-7">
                <p className="text-red-700 font-semibold text-sm">Producto agotado</p>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-7">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">
                  Color
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.color}
                      onClick={() => handleVariantChange(variant)}
                      disabled={!variant.available}
                      className={`px-5 py-3.5 border-2 rounded-xl font-semibold transition-all text-left text-sm ${
                        selectedVariant?.color === variant.color
                          ? 'border-[#2E9ED4] bg-[#2E9ED4]/8 text-[#2E9ED4] ring-2 ring-[#2E9ED4]/20'
                          : variant.available
                          ? 'border-gray-200 text-gray-700 hover:border-[#2E9ED4] bg-white'
                          : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Battery type (fixed) */}
            {product.batteryType && (
              <div className="mb-7">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">
                  Tipo de Batería
                </label>
                <div className="px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                  <p className="text-gray-800 font-medium text-sm">{product.batteryType}</p>
                </div>
              </div>
            )}

            {/* Battery options (selectable) */}
            {product.batteryOptions && product.batteryOptions.length > 0 && (
              <div className="mb-7">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">
                  Opciones de Batería
                </label>
                <div className="space-y-2">
                  {product.batteryOptions.map((option: any, index: number) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 px-5 py-3.5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#2E9ED4] transition-colors bg-white"
                    >
                      <input
                        type="radio"
                        name="battery"
                        value={option.type}
                        checked={selectedBattery === option.type}
                        onChange={(e) => setSelectedBattery(e.target.value)}
                        className="w-4 h-4 accent-[#2E9ED4]"
                      />
                      <span className="text-gray-800 font-medium text-sm">{option.type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-7">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">
                Cantidad
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-[#0B1220] text-white rounded-xl font-bold text-xl hover:bg-[#111827] transition-colors border border-[#1e2d42]"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-[#0B1220] text-white rounded-xl font-bold text-xl hover:bg-[#111827] transition-colors border border-[#1e2d42]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || addedToCart}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 ${
                !product.inStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : addedToCart
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-[#2E9ED4] text-white hover:bg-[#2589BB] shadow-card-hover hover:shadow-glow-blue transform hover:scale-[1.02]'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {!product.inStock
                ? 'Producto Agotado'
                : addedToCart
                ? '¡Agregado al Carrito!'
                : 'Agregar al carrito'}
            </button>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-10 border-t border-gray-200 pt-8">
                <h3 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wide">
                  Especificaciones Técnicas
                </h3>
                <div className="space-y-0">
                  {product.specs.map((spec: any, index: number) => (
                    <div
                      key={index}
                      className={`flex justify-between py-3.5 border-b border-gray-100 ${
                        index % 2 === 0 ? 'bg-transparent' : ''
                      }`}
                    >
                      <span className="font-semibold text-gray-700 text-sm">{spec.label}</span>
                      <span className="text-gray-600 text-sm text-right ml-4">{spec.value}</span>
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
