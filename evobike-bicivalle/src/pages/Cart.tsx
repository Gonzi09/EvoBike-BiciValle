import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { items, total, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shipping = 0; // Free shipping
  const taxes = Math.round(total * 0.19); // 19% IVA
  const finalTotal = total + shipping + taxes;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-text-muted mx-auto mb-6" />
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-text-secondary mb-8">
            Comienza a agregar productos increíbles a tu carrito
          </p>
          <Link
            to="/bicicletas"
            className="inline-block bg-accent-fuchsia text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-fuchsia-hover transition-colors duration-200"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-primary-surface rounded-lg p-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant || 'default'}`}
                  className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-800 last:border-0"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="w-full sm:w-32 h-32 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-text-primary font-semibold text-lg hover:text-primary-green-bright transition-colors duration-200"
                      >
                        {item.product.name}
                      </Link>
                      {item.selectedVariant && (
                        <p className="text-text-secondary text-sm mt-1">
                          Color: {item.selectedVariant}
                        </p>
                      )}
                      <p className="text-primary-green-bright font-bold text-xl mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-primary-bg rounded-lg text-text-primary hover:bg-primary-green-dark transition-colors duration-200 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-text-primary font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-primary-bg rounded-lg text-text-primary hover:bg-primary-green-dark transition-colors duration-200 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal & Remove */}
                      <div className="flex items-center space-x-4">
                        <span className="text-text-primary font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-text-muted hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary-surface rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Envío</span>
                  <span className="text-primary-green-bright font-medium">
                    {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>IVA (19%)</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-text-primary text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-green-bright">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-accent-fuchsia text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-fuchsia-hover transition-all duration-200 hover:shadow-glow-fuchsia mb-3"
              >
                Ir a pagar
              </button>

              <Link
                to="/bicicletas"
                className="block w-full bg-primary-green-dark text-text-primary py-3 rounded-lg font-medium text-center hover:bg-primary-green-hover transition-colors duration-200"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;