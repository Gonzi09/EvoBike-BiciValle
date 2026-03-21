import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Truck } from 'lucide-react';

const Checkout: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  const subtotal = total;
  const tax = Math.round(subtotal * 0.19);
  const shipping = 0;
  const totalAmount = subtotal + tax + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 FIX: quitar /api
      const API_URL =
        import.meta.env.VITE_API_URL || 'http://localhost:5001';

      const orderItems = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
      }));

      const email = formData.email.trim();
      const total = Number(totalAmount);

      if (!email) {
        throw new Error('El email es obligatorio para crear la sesión de pago');
      }

      if (!Number.isFinite(total) || total <= 0) {
        throw new Error('Total inválido para crear la sesión de pago');
      }

      if (orderItems.length === 0) {
        throw new Error('No hay productos para procesar el pago');
      }

      const payload = {
        ...formData,
        email,
        items: orderItems,
        total,
      };

      console.log('PAYLOAD:', payload);
      console.log('CHECKOUT ENDPOINT:', `${API_URL}/checkout/create-session`);

      const response = await fetch(`${API_URL}/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('FULL RESPONSE:', data);

      if (!response.ok) {
        console.error('ERROR BACKEND:', data);
        throw new Error(data.error || 'Error creando sesión');
      }

      console.log('BACKEND RESPONSE:', data);

      const params = data.params;

      if (!params) {
        throw new Error('Backend no envió params');
      }

      console.log('PARAMS:', params);
      console.log('KEYS:', Object.keys(params));

      if (!params['public-key']) {
        throw new Error('Backend envió params sin public-key');
      }

      const requiredFields = [
        'public-key',
        'currency',
        'amount-in-cents',
        'reference',
        'signature:integrity',
      ];

      const missingFields = requiredFields.filter((field) => !params[field]);
      if (missingFields.length > 0) {
        throw new Error(`Faltan campos requeridos de Wompi: ${missingFields.join(', ')}`);
      }

      console.log('WOMPI PARAMS FINAL:', params);

      // 🔥 FORM CORRECTO PARA WOMPI
      const form = document.createElement('form');
      form.style.display = 'none';

      console.log('CHECK SIGNATURE:', params['signature:integrity']);

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.innerHTML = '';
      document.body.appendChild(form);

      console.log('REDIRECTING TO WOMPI...');
      console.log('FINAL PARAMS:', params);
      console.log('PUBLIC KEY FINAL:', params['public-key']);

      form.method = 'GET';
      form.action = 'https://checkout.wompi.co/p/';

      console.log('FINAL PARAMS SENT:', params);
      form.submit();

    } catch (error: any) {
      console.error('ERROR:', error);
      alert(error.message || 'Error al procesar el pago');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu carrito está vacío
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-8">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-green-600" />
                Información de Envío
              </h2>

              <input
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                placeholder="Nombre"
                className="w-full mb-3 p-3 border rounded"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="w-full mb-3 p-3 border rounded"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Teléfono"
                className="w-full mb-3 p-3 border rounded"
              />

              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Ciudad"
                className="w-full mb-3 p-3 border rounded"
              />

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Dirección"
                className="w-full mb-3 p-3 border rounded"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold"
              >
                {loading ? 'Procesando...' : 'Pagar'}
              </button>
            </form>
          </div>

          {/* RESUMEN */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Resumen</h2>

              {items.map((item, i) => (
                <div key={i} className="flex justify-between mb-2">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}

              <hr className="my-4" />

              <p>Subtotal: {formatPrice(subtotal)}</p>
              <p>IVA: {formatPrice(tax)}</p>
              <p className="font-bold text-lg">
                Total: {formatPrice(totalAmount)}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;