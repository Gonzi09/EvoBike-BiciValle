import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { fetchGroupBySlug } from '../utils/api';

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/f0f5f5/2E9ED4?text=Sin+imagen';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchGroupBySlug(slug);
        setProduct(data);
        const defaultIdx = (data?.variants ?? []).findIndex((v: any) => v.inStock);
        setSelectedVariantIndex(defaultIdx >= 0 ? defaultIdx : 0);
        setSelectedImageIndex(0);
        setQuantity(1);
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const variants = product?.variants ?? [];
  const activeVariant = variants[selectedVariantIndex] ?? variants[0] ?? null;
  const images = activeVariant?.images ?? [];
  const galleryImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  const availableQuantity = Number(activeVariant?.available_quantity ?? 0);
  const maxQuantity = Math.max(1, availableQuantity || 1);
  const isInStock = Boolean(activeVariant?.inStock) && availableQuantity > 0;

  useEffect(() => {
    setQuantity((current) => Math.min(Math.max(1, current), maxQuantity));
  }, [maxQuantity]);

  const mainImage = galleryImages[selectedImageIndex] ?? PLACEHOLDER_IMAGE;

  const formattedPrice = useMemo(() => {
    const price = Number(activeVariant?.price ?? product?.price ?? 0);
    return `$${price.toLocaleString('es-CO')}`;
  }, [activeVariant?.price, product?.price]);

  const handleAddToCart = () => {
    if (!product || !isInStock || !activeVariant) {
      return;
    }

    const cartItem = {
      ...product,
      code: activeVariant.siigoCode,
      name: `${product.displayName} – ${activeVariant.colorLabel}`,
      price: activeVariant.price,
      images: activeVariant.images,
      available_quantity: activeVariant.available_quantity,
    };
    addItem(cartItem, quantity);
    setAddedToCart(true);
    window.setTimeout(() => setAddedToCart(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2E9ED4] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-sm">
          <h2 className="text-2xl font-medium text-gray-900 mb-3">Producto no encontrado</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#2E9ED4] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
        </div>
      </div>
    );
  }

  const stockLabel = isInStock ? 'En stock' : 'Agotado';
  const stockStyles = isInStock
    ? { backgroundColor: '#e8f8f5', color: '#0a7a60' }
    : { backgroundColor: '#fde8e8', color: '#c0392b' };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-[#2E9ED4] transition-colors mb-6"
          aria-label="Volver atrás"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <section className="w-full">
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-2xl min-h-[200px] lg:min-h-[400px]"
              style={{ backgroundColor: '#f0f5f5' }}
            >
              <img
                src={mainImage}
                alt={product.displayName ?? product.name}
                className="w-full h-full object-contain p-6"
              />

              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className="h-2 w-2 rounded-full transition-all"
                      style={{
                        backgroundColor: selectedImageIndex === index ? '#2E9ED4' : '#cbd5d1',
                        transform: selectedImageIndex === index ? 'scale(1.2)' : 'scale(1)',
                      }}
                      aria-label={`Ver imagen ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-white"
                  style={{
                    border: selectedImageIndex === index ? '1.5px solid #2E9ED4' : '1px solid #d9e1e1',
                  }}
                  aria-label={`Seleccionar imagen ${index + 1}`}
                >
                  <img src={image} alt={`${product.displayName ?? product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </section>

          <section className="w-full lg:pt-2">
            <p
              className="uppercase mb-3"
              style={{ color: '#2E9ED4', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em' }}
            >
              BICICLETAS ELÉCTRICAS
            </p>

            <h1 className="mb-3 text-[20px] lg:text-[32px] font-medium leading-tight text-gray-900">
              {product.displayName ?? product.name}
            </h1>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-[28px] font-medium" style={{ color: '#2E9ED4' }}>
                {formattedPrice}
              </span>
              <span
                className="inline-flex items-center px-3 py-1 text-[13px] font-medium rounded-full"
                style={stockStyles}
              >
                {stockLabel}
              </span>
            </div>

            {variants.length > 1 && (
              <div className="mb-5">
                <p className="text-sm text-gray-600 mb-2">
                  Color: <span className="font-medium text-gray-900">{activeVariant?.colorLabel}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant: any, index: number) => (
                    <button
                      key={variant.siigoCode}
                      type="button"
                      onClick={() => { setSelectedVariantIndex(index); setSelectedImageIndex(0); }}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-all"
                      style={{
                        borderColor: selectedVariantIndex === index ? '#2E9ED4' : '#d1d5db',
                        backgroundColor: selectedVariantIndex === index ? '#e0f3fb' : '#fff',
                        color: selectedVariantIndex === index ? '#1a7aa8' : '#374151',
                        opacity: variant.inStock ? 1 : 0.45,
                      }}
                    >
                      {variant.colorLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-5">
              <p className="mb-2 text-base text-gray-600">Cantidad</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={!isInStock || quantity <= 1}
                  className="h-9 w-9 rounded-[6px] border border-gray-300 text-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </button>
                <div className="h-9 min-w-9 px-3 flex items-center justify-center rounded-[6px] border border-gray-300 text-sm font-medium text-gray-900">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
                  disabled={!isInStock || quantity >= maxQuantity}
                  className="h-9 w-9 rounded-[6px] border border-gray-300 text-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-[14px] text-[15px] font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: '#2E9ED4' }}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInStock ? 'Agregar al carrito' : 'Agotado'}
            </button>

            {addedToCart && (
              <p className="mt-3 text-sm font-medium" style={{ color: '#2E9ED4' }}>
                Agregado al carrito
              </p>
            )}

            <div className="my-6 h-px w-full bg-gray-200" />

            <div>
              <h2 className="mb-4 text-base font-medium text-gray-900">Especificaciones</h2>

              {product.description?.trim() && (
                <p className="mb-5 text-base leading-6 text-gray-600">{product.description}</p>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-base">
                  <span className="text-gray-500">Stock disponible</span>
                  <span className="text-gray-900">{activeVariant?.available_quantity ?? 0}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
