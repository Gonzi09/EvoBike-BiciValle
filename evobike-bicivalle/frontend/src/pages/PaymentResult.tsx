import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const PaymentResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');

  useEffect(() => {
    const transactionId = searchParams.get('id');
    const transactionStatus = searchParams.get('status');

    if (transactionStatus === 'APPROVED') {
      setStatus('success');
      clearCart();
      setTimeout(() => {
        navigate('/success');
      }, 3000);
    } else if (transactionStatus === 'DECLINED' || transactionStatus === 'ERROR') {
      setStatus('failed');
    } else if (transactionStatus === 'PENDING') {
      setStatus('pending');
    } else {
      setStatus('loading');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="w-20 h-20 text-green-600 mx-auto mb-6 animate-spin" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Verificando pago...</h2>
            <p className="text-gray-600">Por favor espera un momento</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pago Exitoso</h2>
            <p className="text-gray-600 mb-6">
              Tu pago ha sido procesado correctamente. Recibirás un email de confirmación.
            </p>
            <p className="text-sm text-gray-500">Redirigiendo...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="w-20 h-20 text-red-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pago Rechazado</h2>
            <p className="text-gray-600 mb-6">
              No se pudo procesar tu pago. Por favor intenta de nuevo.
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
            >
              Intentar de Nuevo
            </button>
          </>
        )}

        {status === 'pending' && (
          <>
            <Clock className="w-20 h-20 text-yellow-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pago Pendiente</h2>
            <p className="text-gray-600 mb-6">
              Tu pago está siendo procesado. Te notificaremos cuando se confirme.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
            >
              Volver al Inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;