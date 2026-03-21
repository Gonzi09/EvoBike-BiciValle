import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);

  const handleTestPayment = async () => {
    try {
      const response = await fetch('https://api.movilibre.co/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: total > 0 ? total : 50000,
          email: 'test@test.com',
          customerName: 'Test User',
          phone: '3000000000',
        }),
      });

      const data = await response.json();

      const url = new URL('https://checkout.wompi.co/p/');
      Object.entries(data.params).forEach(([key, value]) => {
        url.searchParams.append(key, value as string);
      });

      window.location.href = url.toString();
    } catch (error) {
      console.error('Error iniciando pago:', error);
    }
  };

  /* ── Empty State ── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#2E9ED4]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-[#2E9ED4]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Agrega productos para continuar con tu compra.
          </p>

          <Link
            to="/bicicletas"
            className="inline-flex items-center gap-2 bg-[#2E9ED4] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#2589BB] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explorar productos
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleTestPayment}
            className="mt-5 text-xs text-gray-400 hover:text-[#2E9ED4] transition-colors block mx-auto underline underline-offset-2"
          >
            Probar pago (dev)
          </button>
        </div>
      </div>
    );
  }

  /* ── Filled State ── */
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Item List ── */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-5 shadow-card hover:border-[#2E9ED4]/40 transition-colors"
              >
                {/* Product image or placeholder */}
                {item.product.images?.[0] ? (
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Cantidad: <span className="font-semibold text-gray-700">{item.quantity}</span>
                  </p>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#2E9ED4] text-base">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-400">
                      {formatPrice(item.product.price)} c/u
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card sticky top-24">
              <h2 className="text-xs font-bold text-gray-900 mb-5 uppercase tracking-widest">
                Resumen del pedido
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})</span>
                  <span className="text-gray-700 font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Envío</span>
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-gray-100">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-[#2E9ED4]">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-4 bg-[#2E9ED4] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#2589BB] transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Ir al Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/bicicletas"
                className="block text-center text-sm text-gray-400 hover:text-[#2E9ED4] transition-colors mt-4"
              >
                ← Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
