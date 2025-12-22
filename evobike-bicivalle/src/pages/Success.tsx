import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const total = location.state?.total;

  if (!orderData || !total) {
    return <Navigate to="/" replace />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const orderNumber = `EVO-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-primary-surface rounded-lg p-8 md:p-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-text-secondary text-lg mb-8">
            Gracias por tu compra. Hemos recibido tu pedido y lo procesaremos pronto.
          </p>

          <div className="bg-primary-bg rounded-lg p-6 mb-8 text-left">
            <div className="space-y-3">
              <div className="flex justify-between pb-3 border-b border-gray-800">
                <span className="text-text-secondary">Número de pedido:</span>
                <span className="text-text-primary font-semibold">{orderNumber}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-800">
                <span className="text-text-secondary">Email:</span>
                <span className="text-text-primary">{orderData.email}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-800">
                <span className="text-text-secondary">Total:</span>
                <span className="text-primary-green-bright font-bold text-xl">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Estado:</span>
                <span className="text-accent-fuchsia font-semibold">En proceso</span>
              </div>
            </div>
          </div>

          <div className="bg-primary-green-dark bg-opacity-20 border border-primary-green-dark rounded-lg p-4 mb-8">
            <p className="text-text-secondary text-sm">
              Te hemos enviado un email de confirmación a{' '}
              <span className="text-primary-green-bright font-medium">{orderData.email}</span>
              {' '}con los detalles de tu pedido.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/bicicletas"
              className="inline-flex items-center justify-center space-x-2 bg-accent-fuchsia text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-fuchsia-hover transition-colors duration-200 w-full sm:w-auto"
            >
              <span>Seguir comprando</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="block sm:inline-block bg-primary-green-dark text-text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary-green-hover transition-colors duration-200 w-full sm:w-auto sm:ml-3"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;