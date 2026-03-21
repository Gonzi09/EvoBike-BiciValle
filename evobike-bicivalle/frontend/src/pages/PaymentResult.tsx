import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'https://api.movilibre.co';

const PaymentResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const transactionId =
    searchParams.get('id') || searchParams.get('transaction_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');

  useEffect(() => {
    let isActive = true;
    let redirectTimeout: number | undefined;

    if (!transactionId) {
      setStatus('failed');
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/checkout/verify-payment/${transactionId}`
        );

        if (!res.ok) {
          if (isActive) {
            setStatus('failed');
          }
          return;
        }

        const data = await res.json();

        if (data.status === 'APPROVED') {
          if (!isActive) {
            return;
          }

          setStatus('success');
          clearCart();

          redirectTimeout = window.setTimeout(() => {
            navigate('/success');
          }, 3000);
        } else if (data.status === 'DECLINED' || data.status === 'ERROR') {
          if (isActive) {
            setStatus('failed');
          }
        } else if (data.status === 'PENDING') {
          if (isActive) {
            setStatus('pending');
          }
        } else {
          if (isActive) {
            setStatus('failed');
          }
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setStatus('failed');
        }
      }
    };

    verify();

    return () => {
      isActive = false;
      if (redirectTimeout) {
        window.clearTimeout(redirectTimeout);
      }
    };
  }, [transactionId]);

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-[#111827] rounded-2xl shadow-2xl border border-[#1e2d42] p-10 text-center">

        {/* ── Loading ── */}
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 rounded-full bg-[#2E9ED4]/10 flex items-center justify-center mx-auto mb-6">
              <Loader className="w-10 h-10 text-[#2E9ED4] animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Verificando pago...</h2>
            <p className="text-gray-400 text-sm">Por favor espera un momento</p>
            <div className="mt-6 flex justify-center gap-1.5">
              <span className="w-2 h-2 bg-[#2E9ED4] rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-[#2E9ED4] rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-[#2E9ED4] rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </>
        )}

        {/* ── Success ── */}
        {status === 'success' && (
          <>
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Pago Exitoso</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Tu pago ha sido procesado correctamente.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#2E9ED4] bg-[#2E9ED4]/10 px-4 py-2 rounded-full border border-[#2E9ED4]/20">
              <Loader className="w-3 h-3 animate-spin" />
              Redirigiendo...
            </div>
          </>
        )}

        {/* ── Failed ── */}
        {status === 'failed' && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Pago Rechazado</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              No se pudo procesar tu pago. Intenta de nuevo.
            </p>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#2E9ED4] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#2589BB] transition-all shadow-lg hover:shadow-glow-blue transform hover:scale-[1.02]"
            >
              Intentar de Nuevo
            </button>
          </>
        )}

        {/* ── Pending ── */}
        {status === 'pending' && (
          <>
            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Pago Pendiente</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Tu pago está siendo procesado.
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#2E9ED4] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#2589BB] transition-all shadow-lg hover:shadow-glow-blue transform hover:scale-[1.02]"
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
