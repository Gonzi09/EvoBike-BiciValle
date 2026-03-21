import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock3, XCircle } from 'lucide-react';

type PaymentStatus = 'APPROVED' | 'PENDING' | 'DECLINED' | 'ERROR' | 'UNKNOWN';

const CheckoutResult: React.FC = () => {
  const [searchParams] = useSearchParams();

  const rawStatus = (
    searchParams.get('status') ||
    searchParams.get('transaction_status') ||
    searchParams.get('payment_status') ||
    ''
  )
    .toUpperCase()
    .trim();

  const reference =
    searchParams.get('reference') ||
    searchParams.get('reference_id') ||
    searchParams.get('external_reference') ||
    'No disponible';

  const status: PaymentStatus =
    rawStatus === 'APPROVED' || rawStatus === 'PENDING' || rawStatus === 'DECLINED' || rawStatus === 'ERROR'
      ? (rawStatus as PaymentStatus)
      : 'UNKNOWN';

  const ui =
    status === 'APPROVED'
      ? {
          title: 'Pago aprobado',
          message: 'Tu pago fue procesado correctamente. Gracias por comprar en Movilibre.',
          tone: 'text-emerald-700',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: <CheckCircle2 className="w-10 h-10 text-emerald-600" />,
        }
      : status === 'PENDING'
      ? {
          title: 'Pago pendiente',
          message: 'Tu pago está en validación. Te notificaremos cuando se confirme.',
          tone: 'text-amber-700',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: <Clock3 className="w-10 h-10 text-amber-600" />,
        }
      : {
          title: 'Pago no completado',
          message: 'No pudimos confirmar tu pago. Puedes intentarlo nuevamente.',
          tone: 'text-rose-700',
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          icon: <XCircle className="w-10 h-10 text-rose-600" />,
        };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-20">
      <section className="w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-8 md:p-10">
        <div className={`rounded-xl border p-5 ${ui.bg} ${ui.border}`}>
          <div className="flex items-center gap-4">
            <div className="shrink-0">{ui.icon}</div>
            <div>
              <h1 className={`text-2xl font-bold ${ui.tone}`}>{ui.title}</h1>
              <p className="mt-1 text-[#334155]">{ui.message}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
          <h2 className="text-sm font-semibold text-[#0F172A]">Referencia de la orden</h2>
          <p className="mt-2 text-base font-mono text-[#1E293B] break-all">{reference}</p>
        </div>

        <p className="mt-5 text-sm text-[#64748B]">
          Si tienes dudas sobre el estado de tu compra, escríbenos por WhatsApp y comparte esta referencia.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#2E9ED4] px-5 py-3 text-white font-semibold hover:bg-[#1f8abe] transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            to="/checkout"
            className="inline-flex items-center justify-center rounded-xl border border-[#CBD5E1] px-5 py-3 text-[#0F172A] font-semibold hover:bg-[#F1F5F9] transition-colors"
          >
            Volver al checkout
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CheckoutResult;
