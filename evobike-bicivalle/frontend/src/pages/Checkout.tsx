import React from 'react';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Checkout: React.FC = () => {

  const handleTestPayment = async () => {
    try {
      const res = await fetch(`${API_URL}/api/checkout/create-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          total: 100000,
          email: "test@test.com",
          customerName: "Test User",
          phone: "3000000000"
        })
      });

      const data = await res.json();

      const form = document.createElement("form");
      form.method = "GET";
      form.action = "https://checkout.wompi.co/p/";

      Object.entries(data.params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error("Error iniciando pago:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
          {/* Header strip */}
          <div className="bg-[#0B1220] px-8 py-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2E9ED4]/20 rounded-full mb-3">
              <Lock className="w-5 h-5 text-[#2E9ED4]" />
            </div>
            <h1 className="text-xl font-bold text-white">Pago Seguro</h1>
            <p className="text-gray-400 text-sm mt-1">Procesado por Wompi</p>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed">
              Serás redirigido al portal de pago seguro de{' '}
              <span className="font-semibold text-gray-700">Wompi</span>{' '}
              para completar tu compra.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2E9ED4] flex-shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Conexión SSL</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                <CreditCard className="w-4 h-4 text-[#2E9ED4] flex-shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Datos protegidos</span>
              </div>
            </div>

            <button
              onClick={handleTestPayment}
              className="w-full bg-[#2E9ED4] text-white py-4 rounded-xl font-bold text-base hover:bg-[#2589BB] transition-all shadow-lg hover:shadow-glow-blue transform hover:scale-[1.02] flex items-center justify-center gap-2.5"
            >
              <CreditCard className="w-5 h-5" />
              Continuar al Pago
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              Al continuar aceptas nuestros{' '}
              <a href="#" className="text-[#2E9ED4] hover:underline">
                términos y condiciones
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
