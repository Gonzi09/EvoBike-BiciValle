import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, DollarSign, Wallet } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CheckoutForm } from '../types';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'card',
  });
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shipping = 0;
  const taxes = Math.round(total * 0.19);
  const finalTotal = total + shipping + taxes;

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Tarjeta de Crédito/Débito',
      icon: CreditCard,
      description: 'Pago seguro con tarjeta',
    },
    {
      id: 'pse' as const,
      name: 'PSE / Transferencia',
      icon: Building2,
      description: 'Transferencia bancaria',
    },
    {
      id: 'cash' as const,
      name: 'Contraentrega',
      icon: DollarSign,
      description: 'Paga al recibir',
    },
    {
      id: 'paypal' as const,
      name: 'PayPal',
      icon: Wallet,
      description: 'Pago con PayPal',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {};

    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    if (!formData.city.trim()) newErrors.city = 'Ciudad requerida';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simulate payment processing
    console.log('Processing order:', { formData, items, total: finalTotal });
    
    // Clear cart and redirect to success
    clearCart();
    navigate('/success', {
      state: {
        orderData: formData,
        total: finalTotal,
      },
    });
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading font-bold text-text-primary mb-8">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-primary-surface rounded-lg p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Información de Contacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200`}
                    placeholder="Juan Pérez"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200`}
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200`}
                    placeholder="+57 300 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-primary-surface rounded-lg p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Dirección de Envío
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg border ${
                      errors.city ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200`}
                    placeholder="Bogotá"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Dirección completa *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-primary-bg border ${
                      errors.address ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200`}
                    placeholder="Calle 72 #10-51, Apto 301"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-text-secondary text-sm font-medium mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-primary-green-bright transition-colors duration-200 resize-none"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-primary-surface rounded-lg p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Método de Pago
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, paymentMethod: method.id }))
                    }
                    className={`flex items-start space-x-4 p-4 border-2 rounded-lg transition-all duration-200 ${
                      formData.paymentMethod === method.id
                        ? 'border-accent-fuchsia bg-accent-fuchsia bg-opacity-5'
                        : 'border-gray-700 hover:border-primary-green-bright'
                    }`}
                  >
                    <method.icon
                      className={`w-6 h-6 flex-shrink-0 ${
                        formData.paymentMethod === method.id
                          ? 'text-accent-fuchsia'
                          : 'text-text-secondary'
                      }`}
                    />
                    <div className="text-left">
                      <p className="text-text-primary font-medium">{method.name}</p>
                      <p className="text-text-muted text-sm">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-text-muted text-sm mt-4">
                * La integración de pagos será implementada próximamente. Este es un flujo de demostración.
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-primary-surface rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold text-text-primary mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-text-primary text-sm font-medium line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-text-muted text-sm">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-primary-green-bright text-sm font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Envío</span>
                  <span className="text-primary-green-bright font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>IVA (19%)</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                <div className="border-t border-gray-800 pt-3">
                  <div className="flex justify-between text-text-primary text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary-green-bright">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent-fuchsia text-white py-4 rounded-lg font-semibold text-lg hover:bg-accent-fuchsia-hover transition-all duration-200 hover:shadow-glow-fuchsia"
              >
                Pagar ahora
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;