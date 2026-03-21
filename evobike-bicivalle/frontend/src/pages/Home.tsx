import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { fetchProducts } from '../utils/api';

const Home: React.FC = () => {
  /* ─── ALL LOGIC UNCHANGED ─────────────────────────────── */
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      image: '/imgs/polar.png',
      eyebrow: 'Bicicletas Eléctricas',
      title: 'Silencio\nen movimiento.',
      description: 'Potencia y estilo para la ciudad. El motor que nunca escucharás.',
      link: '/bicicletas',
    },
    {
      image: '/imgs/Monopatines.png',
      eyebrow: 'Scooters Eléctricos',
      title: 'Ágil.\nLibre.\nEléctrico.',
      description: 'Movilidad urbana sin límites. Compacto, veloz, sin emisiones.',
      link: '/scooters',
    },
    {
      image: '/imgs/Ricochet.jpeg',
      eyebrow: 'Triciclos Eléctricos',
      title: 'Más carga.\nMás alcance.',
      description: 'Estabilidad y capacidad de carga para el trabajo del día a día.',
      link: '/triciclos',
    },
  ];

  useEffect(() => {
    loadPopularProducts();
  }, []);

  const loadPopularProducts = async () => {
    try {
      const data = await fetchProducts({ limit: '6' });
      const popular = data.products.filter((p: any) => p.popular);
      setPopularProducts(popular.slice(0, 6));
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────────────────────────── */

  const specs = [
    { label: 'Potencia',        value: '350 W' },
    { label: 'Batería',         value: '60V / 20AH (extraíble)\n72V / 20AH (no extraíble)' },
    { label: 'Autonomía',       value: '55 km (60V) / 65 km (72V)' },
    { label: 'Velocidad',       value: '35 – 40 km/h' },
    { label: 'Carga máxima',    value: '150 kg' },
    { label: 'Peso',            value: '51.11 kg' },
    { label: 'Tiempo de carga', value: '6 – 8 horas' },
  ];

  return (
    <div>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative bg-[#0B1220] min-h-screen flex flex-col pt-[80px]"
        style={{ overflow: 'hidden' }}
      >

        {/* ══ BACKGROUND — isolated overflow-hidden layer ═══ */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>

          {/* Depth gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(17,35,60,0.5) 0%, transparent 55%)',
            }}
          />

          {/* Vertical grid lines */}
          {[4, 13, 22, 33, 50, 67, 78, 87, 96].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${left}%`,
                background: `linear-gradient(to bottom,
                  transparent 0%,
                  rgba(46,158,212,${[.08,.03,.05,.03,.07,.03,.05,.03,.08][i]}) 12%,
                  rgba(46,158,212,${[.08,.03,.05,.03,.07,.03,.05,.03,.08][i]}) 88%,
                  transparent 100%)`,
              }}
            />
          ))}

          {/* Central ambient — bleeds wide */}
          <div
            className="absolute"
            style={{
              top: '5%', left: '10%', right: '10%', bottom: '5%',
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(17,24,39,0.36) 0%, rgba(11,18,32,0.16) 52%, transparent 72%)',
              filter: 'blur(54px)',
            }}
          />

          {/* Floor warmth */}
          <div
            className="absolute"
            style={{
              bottom: 0, left: '22%', right: '22%', height: '40%',
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(46,158,212,0.12) 0%, rgba(17,24,39,0.06) 45%, transparent 70%)',
              filter: 'blur(34px)',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(4,8,16,0.5) 72%, rgba(4,8,16,0.82) 100%)',
            }}
          />

          {/* Horizontal scan band */}
          <div
            className="absolute"
            style={{
              top: '28%', left: 0, right: 0, height: '200px',
              background:
                'linear-gradient(to bottom, transparent, rgba(46,158,212,0.016) 50%, transparent)',
            }}
          />
        </div>

        {/* ── HUD corner brackets ── */}
        {[
          { pos: 'top-[72px] left-6',  tl: true },
          { pos: 'top-[72px] right-6', tr: true },
          { pos: 'bottom-12 left-6',   bl: true },
          { pos: 'bottom-12 right-6',  br: true },
        ].map(({ pos, tl, tr, bl, br }, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8 pointer-events-none z-10`}>
            {tl && <><div className="absolute top-0 left-0 w-5 h-px bg-[#2E9ED4]/22" /><div className="absolute top-0 left-0 w-px h-5 bg-[#2E9ED4]/22" /></>}
            {tr && <><div className="absolute top-0 right-0 w-5 h-px bg-[#2E9ED4]/22" /><div className="absolute top-0 right-0 w-px h-5 bg-[#2E9ED4]/22" /></>}
            {bl && <><div className="absolute bottom-0 left-0 w-5 h-px bg-[#2E9ED4]/22" /><div className="absolute bottom-0 left-0 w-px h-5 bg-[#2E9ED4]/22" /></>}
            {br && <><div className="absolute bottom-0 right-0 w-5 h-px bg-[#2E9ED4]/22" /><div className="absolute bottom-0 right-0 w-px h-5 bg-[#2E9ED4]/22" /></>}
          </div>
        ))}

        {/* ══ MAIN CONTENT ════════════════════════════════════ */}
        <div
          className="relative z-10 flex flex-col w-full mx-auto px-4 md:px-6 lg:px-12 xl:px-16 lg:max-w-[1440px]"
          style={{ overflow: 'visible' }}
        >
          {/* Clean 3-column grid layout */}
          <div
            className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center py-8 md:py-12 lg:py-0 gap-4 md:gap-6 lg:gap-4 lg:min-h-screen"
            style={{ gridAutoRows: 'minmax(auto, 1fr)', minHeight: 'auto' }}
          >

            {/* ══════════════════════════════
                LEFT — Text block
            ══════════════════════════════ */}
            <div
              className="col-span-12 lg:col-span-3 flex flex-col justify-center w-full"
              style={{ position: 'relative', zIndex: 20 }}
            >
              {/* Label */}
              <div className="flex items-center gap-3 mb-4 md:mb-6 text-center justify-center lg:text-left lg:justify-start">
                <div
                  className="hidden lg:block h-px"
                  style={{
                    width: '36px',
                    background: 'linear-gradient(to right, #2E9ED4, rgba(46,158,212,0.2))',
                  }}
                />
                <span
                  className="font-bold uppercase"
                  style={{ color: '#2E9ED4', fontSize: 'clamp(7px, 1.8vw, 9.5px)', letterSpacing: '0.48em' }}
                >
                  Scooters eléctricos
                </span>
              </div>

              {/* Title */}
              <div className="mb-4 md:mb-6 text-center lg:text-left">
                {[
                  { text: 'Ágil.',       color: '#F9FAFB' },
                  { text: 'Libre.',      color: '#CBD5E1' },
                  { text: 'Eléctrico.', color: '#2E9ED4' },
                ].map(({ text, color }, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                      fontWeight: 800,
                      color,
                      letterSpacing: '-0.03em',
                      lineHeight: 0.95,
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>

              {/* Description */}
              <p style={{ color: '#9CA3AF', fontSize: 'clamp(13px, 2.2vw, 15px)', lineHeight: 1.6, marginBottom: '16px' }} className="text-center lg:text-left">
                Movilidad urbana sin límites. Compacto, veloz y sin emisiones para la ciudad moderna.
              </p>

              {/* CTA */}
              <div style={{ position: 'relative', marginBottom: '16px', marginTop: '24px' }} className="w-full flex justify-center lg:justify-start">
                <div
                  style={{
                    position: 'absolute',
                    inset: '-5px',
                    borderRadius: '12px',
                    background: 'rgba(46,158,212,0.22)',
                    filter: 'blur(16px)',
                    pointerEvents: 'none',
                  }}
                />
                <Link
                  to="/scooters"
                  className="relative inline-flex items-center justify-center gap-2.5 text-white text-[13px] sm:text-[14px] font-bold px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #2E9ED4, #1e7fab)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 0 16px rgba(0,191,255,0.18)',
                    zIndex: 1,
                    transition: 'all 0.26s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'linear-gradient(135deg, #00BFFF, #2E9ED4)';
                    el.style.boxShadow = '0 0 22px rgba(0,191,255,0.36), 0 6px 18px rgba(0,0,0,0.38)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'linear-gradient(135deg, #2E9ED4, #1e7fab)';
                    el.style.boxShadow = '0 1px 0 rgba(255,255,255,0.08) inset, 0 0 16px rgba(0,191,255,0.18)';
                  }}
                >
                  Ver modelo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini stats */}
              <div
                className="hidden lg:flex items-center gap-5 pt-5"
                style={{ borderTop: '1px solid rgba(30,45,66,0.65)' }}
              >
                {[{ l: 'Velocidad', v: '40 km/h' }, { l: 'Autonomía', v: '65 km' }].map(({ l, v }, i) => (
                  <React.Fragment key={l}>
                    {i > 0 && <div style={{ width: '1px', height: '28px', background: 'rgba(30,45,66,0.9)' }} />}
                    <div className="group cursor-default transition-all duration-300 rounded-md px-2 py-1 hover:bg-[#2E9ED414] hover:shadow-[0_0_10px_#00BFFF33]">
                      <p className="text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors duration-300" style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '2px' }}>{l}</p>
                      <p className="text-[#E2E8F0] group-hover:text-[#F9FAFB] transition-colors duration-300" style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'monospace' }}>{v}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Vertical accent line */}
              <div
                className="hidden lg:block mt-8"
                style={{
                  width: '1px', height: '52px',
                  background: 'linear-gradient(to bottom, rgba(46,158,212,0.3), transparent)',
                  marginLeft: 'auto', marginRight: 'auto'
                }}
              />
            </div>


            {/* ══════════════════════════════
                CENTER — Scooter image
            ══════════════════════════════ */}
            <div
              className="col-span-12 lg:col-span-6"
              style={{ position: 'relative', minHeight: 'clamp(240px, 50vw, 550px)', overflow: 'visible' }}
            >
              {/* ── Glow system — positioned absolutely within relative container ── */}

              {/* Focused main glow */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '52%',
                  width: '620px',
                  height: '620px',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(46,158,212,0.26) 0%, rgba(46,158,212,0.12) 38%, transparent 72%)',
                  filter: 'blur(174px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Secondary accent glow */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '48%',
                  width: '300px',
                  height: '300px',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(0,191,255,0.16) 0%, transparent 72%)',
                  filter: 'blur(88px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Subtle atmospheric depth behind scooter */}
              <div
                style={{
                  position: 'absolute',
                  top: '18%', left: '10%', right: '10%', bottom: '20%',
                  background: 'radial-gradient(ellipse at 50% 54%, rgba(17,24,39,0.4) 0%, rgba(11,18,32,0.16) 52%, transparent 75%)',
                  filter: 'blur(64px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Floor ellipse glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '11%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '68%',
                  height: '72px',
                  background: 'radial-gradient(ellipse, rgba(46,158,212,0.28) 0%, rgba(0,191,255,0.07) 40%, transparent 68%)',
                  filter: 'blur(16px)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              {/* Vignette overlay — edge darkening for depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(11,18,32,0.32) 72%, rgba(11,18,32,0.6) 100%)',
                  pointerEvents: 'none',
                  zIndex: 4,
                }}
              />

              {/* ── Scooter — absolute, bleeds into side columns ── */}
              <div
                style={{
                  position: 'absolute',
                  left: 'clamp(-18%, -12vw, -8%)',
                  right: 'clamp(-18%, -12vw, -8%)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '13%',
                    transform: 'translateX(-50%)',
                    width: '56%',
                    height: '68px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 52%, transparent 76%)',
                    filter: 'blur(18px)',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />

                {/* Main image — NO background, floats free */}
                <img
                  src="/imgs/aguilaFondo.png"
                  alt="Scooter Aguila"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    /*
                     * drop-shadow applies to image CONTENT (transparent-aware),
                     * not to a bounding rectangle — this is key for no-box feel
                     */
                    filter: [
                      'drop-shadow(0 0 54px rgba(0,191,255,0.18))',
                      'drop-shadow(0 36px 108px rgba(46,158,212,0.46))',
                      'drop-shadow(0 16px 44px rgba(0,0,0,0.9))',
                    ].join(' '),
                    mixBlendMode: 'screen',
                    WebkitMaskImage:
                      'radial-gradient(ellipse at 50% 52%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.9) 74%, rgba(0,0,0,0.55) 84%, transparent 98%)',
                    maskImage:
                      'radial-gradient(ellipse at 50% 52%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.9) 74%, rgba(0,0,0,0.55) 84%, transparent 98%)',
                  }}
                />

                {/* Reflection — CSS mask, no wrapper overflow:hidden */}
                <img
                  src="/imgs/aguilaHero.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    transform: 'scaleY(-1)',
                    marginTop: '-6%',
                    opacity: 0.09,
                    /*
                     * mask fades reflection away — no rectangular clip
                     */
                    WebkitMaskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.26) 26%, transparent 54%)',
                    maskImage:
                      'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.26) 26%, transparent 54%)',
                    maxHeight: '112px',
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* Floor separator line */}
                <div
                  style={{
                    width: '38%',
                    height: '1px',
                    marginTop: '-2%',
                    background:
                      'linear-gradient(to right, transparent, rgba(46,158,212,0.62), rgba(0,191,255,0.28), transparent)',
                  }}
                />
              </div>

            </div>


            {/* ══════════════════════════════
                RIGHT — Specs card
            ══════════════════════════════ */}
            <div
              className="col-span-12 lg:col-span-3 flex flex-col justify-center"
              style={{ position: 'relative', zIndex: 20 }}
            >
              {/* Specs card */}
              <div
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(28,42,60,0.9)',
                  background: 'rgba(10,17,30,0.7)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: 'inset 0 1px 0 rgba(46,158,212,0.1)',
                  maxHeight: '600px',
                  overflowY: 'auto',
                }}
                className="max-w-full"
              >
                {/* Top accent line */}
                <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(46,158,212,0.55), rgba(0,191,255,0.22), transparent)' }} />

                {/* Header */}
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(28,42,60,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E9ED4' }} />
                    <span style={{ color: '#2E9ED4', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.44em' }}>Especificaciones</span>
                  </div>
                  <span style={{ color: '#1a2a3a', fontSize: '8px', fontFamily: 'monospace', letterSpacing: '0.1em' }}>SX1</span>
                </div>

                {/* Rows */}
                <div style={{ padding: '0 12px' }} className="md:px-5">
                  {specs.map(({ label, value }, i) => (
                    <div key={label}>
                      <div className="group transition-all duration-300 rounded-md px-2 -mx-2 py-2 md:py-2 hover:bg-[#2E9ED414] hover:shadow-[0_0_12px_#00BFFF40] hover:translate-x-[3px]" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                        <p className="text-[#4B5D70] group-hover:text-[#9CA3AF] transition-colors duration-300" style={{ fontSize: '8.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: '3px' }}>
                          {label}
                        </p>
                        <p className="text-[#9CA3AF] group-hover:text-[#F9FAFB] transition-colors duration-300" style={{ fontSize: '11px', fontWeight: 650, lineHeight: 1.45, whiteSpace: 'pre-line' }}>
                          {value}
                        </p>
                      </div>
                      {i < specs.length - 1 && (
                        <div style={{ height: '1px', background: 'rgba(28,42,60,0.9)' }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(28,42,60,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#172130', fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.2em' }}>EVOBIKE-AGUILA</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(46,158,212,0.55)' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(46,158,212,0.25)' }} />
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(46,158,212,0.1)' }} />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ══ BOTTOM HUD ═════════════════════════════════════ */}
          <div style={{ position: 'relative', flexShrink: 0, paddingBottom: '20px' }}>

            {/* HUD curve */}
            <svg viewBox="0 0 1300 52" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '52px', opacity: 0.18 }}>
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="1300" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="45%" stopColor="#2E9ED4" />
                  <stop offset="55%" stopColor="#00BFFF" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d="M 0 48 C 200 38, 340 9, 650 19 C 960 29, 1100 11, 1300 25" stroke="url(#hg)" strokeWidth="0.8" fill="none" />
              <circle cx="650" cy="19" r="3" fill="#2E9ED4" fillOpacity="0.85" />
              <circle cx="650" cy="19" r="7" fill="#2E9ED4" fillOpacity="0.12" />
              <line x1="650" y1="5" x2="650" y2="33" stroke="#2E9ED4" strokeWidth="0.4" strokeOpacity="0.32" />
              <circle cx="310" cy="11" r="1.5" fill="#2E9ED4" fillOpacity="0.5" />
              <circle cx="990" cy="13" r="1.5" fill="#2E9ED4" fillOpacity="0.5" />
            </svg>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px', paddingRight: 'clamp(16px, 5vw, 64px)' }}>
              <span style={{ color: '#101C2A', fontSize: 'clamp(7px, 2vw, 8.5px)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                MOVILIDAD LIBRE — EVOBIKE ©2026
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          2. FEATURED CATEGORY
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F7F7] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-[110rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight">
                Hay una oferta diseñada para ti.
              </h2>
            </div>
            <div className="md:max-w-sm">
              <p className="text-gray-800 text-lg font-semibold leading-relaxed mb-4 max-w-md">
                Explora opciones prácticas y cómodas para tu movilidad diaria.
              </p>
              <Link
                to="/bicicletas"
                className="group inline-flex items-center bg-[#2E9ED4] text-white px-6 py-3 rounded-xl text-base font-semibold shadow-sm hover:bg-[#1e7fab] hover:shadow-md transition-all duration-200"
              >
                Ver todo <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { img: '/imgs/polar.png', title: 'Bicicletas Eléctricas', link: '/bicicletas', position: 'center 26%' },
              { img: '/imgs/Monopatines.png', title: 'Scooters Eléctricos', link: '/scooters', position: 'center 33%' },
              { img: '/imgs/Ricochet.jpeg', title: 'Triciclos Eléctricos', link: '/triciclos', position: 'center 24%' },
            ].map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className="group block bg-white rounded-2xl shadow-md border border-[#E5E7EB] overflow-hidden"
              >
                <div className="h-[24.5rem] bg-[#F3F4F6] overflow-hidden rounded-t-2xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: item.position }}
                  />
                </div>
                <div className="px-5 py-4 border-t border-[#F1F5F9] min-h-[120px] flex items-center justify-center">
                  <h3 className="text-[#111827] text-xl font-medium text-center">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3. VALUE PROPOSITION
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#111827] py-24 border-b border-[#1e2d42]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Visítanos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F9FAFB] tracking-tight">Movilidad Libre</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8 items-stretch">
            <div className="bg-[#0B1220] border border-[#1e2d42] rounded-2xl px-7 py-7">
              <p className="text-[#2E9ED4] text-xs uppercase tracking-[0.22em] font-semibold mb-2.5">Tienda de bicicletas eléctricas en Cali, Colombia</p>
              <p className="text-[#9CA3AF] text-base sm:text-lg leading-relaxed mb-6">
                Visítanos y conoce nuestras opciones de movilidad en persona. Estamos listos para ayudarte a encontrar el modelo ideal.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start justify-between gap-5 pb-2.5 border-b border-[#1e2d42]">
                  <span className="text-[#6B7280] text-sm uppercase tracking-[0.16em]">Dirección</span>
                  <span className="text-[#F9FAFB] text-sm sm:text-base font-medium text-right">Av. Roosevelt #25-68 local 104, 3 de Julio, Valle del Cauca</span>
                </div>
                <div className="flex items-start justify-between gap-5 pb-2.5 border-b border-[#1e2d42]">
                  <span className="text-[#6B7280] text-sm uppercase tracking-[0.16em]">Ciudad</span>
                  <span className="text-[#F9FAFB] text-sm sm:text-base font-medium text-right">Cali, Colombia</span>
                </div>
                <div className="flex items-start justify-between gap-5 pb-2.5 border-b border-[#1e2d42]">
                  <span className="text-[#6B7280] text-sm uppercase tracking-[0.16em]">Horario</span>
                  <span className="text-[#F9FAFB] text-sm sm:text-base font-medium text-right">Abierto · Cierra a las 6 p.m.</span>
                </div>
                <div className="flex items-start justify-between gap-5 pb-1">
                  <span className="text-[#6B7280] text-sm uppercase tracking-[0.16em]">Teléfono</span>
                  <span className="text-[#F9FAFB] text-sm sm:text-base font-medium text-right">+57 318 4128902</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Movilidad+Libre,+Av.+Roosevelt+%2325-68+local+104,+3+de+Julio,+Cali,+Valle+del+Cauca,+Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#2E9ED4] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1e7fab] hover:shadow-md transition-all duration-200"
              >
                Abrir en Google Maps <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <a
                href="https://www.google.com/maps/place/Movilidad+Libre/@3.4339588,-76.5397332,18z/data=!4m6!3m5!1s0x8e30a71c5292bbe9:0x921144b53be8b4fe!8m2!3d3.4346753!4d-76.5389735!16s%2Fg%2F11n9gpyjky?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-[#1e2d42] shadow-sm bg-[#0B1220] h-[360px] md:h-[380px]"
              aria-label="Abrir ubicación en Google Maps"
            >
              <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B1220]/75 text-[#F9FAFB] text-xs font-semibold tracking-wide border border-[#1e2d42]">
                Ver en Google Maps
              </span>
              <iframe
                title="Ubicación EvoBike"
                src="https://www.google.com/maps?cid=10525269349326435582&hl=es&z=19&output=embed"
                className="w-full h-full pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          4. PRODUCT GRID
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#FAFAFA] py-24 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-3">Colección</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] tracking-tight">Productos Destacados</h2>
            </div>
            <Link to="/bicicletas" className="text-base text-[#6B7280] hover:text-[#2E9ED4] transition-colors flex items-center gap-1 group font-medium">
              Ver todo <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3">
              <div className="w-5 h-5 border-2 border-[#94A3B8] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#6B7280] text-base font-medium">Cargando...</span>
            </div>
          ) : popularProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProducts.map((product) => (
                <Link
                  key={product.id}
                  to={product?.id ? `/product/${product.id}` : '/bicicletas'}
                  className="group block bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-56 bg-white rounded-t-2xl flex items-center justify-center p-8 overflow-hidden">
                    <img
                      src={product?.images?.[0] || '/imgs/polar.png'}
                      alt={product?.name || 'Producto'}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="px-6 py-5 border-t border-[#F1F5F9]">
                    <h3 className="text-[#111827] text-lg font-medium leading-snug mb-2">{product?.name}</h3>
                    <p className="text-[#374151] text-base font-medium mb-4">
                      {new Intl.NumberFormat('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      }).format(product?.price || 0)}
                    </p>
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#D1D5DB] text-[#374151] text-sm font-medium group-hover:border-[#9CA3AF] group-hover:text-[#111827] transition-colors">
                      Ver producto
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { img: '/imgs/polar.png',      title: 'Bicicletas Eléctricas', price: 'Desde $2,100,000', link: '/bicicletas' },
                { img: '/imgs/Monopatines.png', title: 'Scooters Eléctricos',  price: 'Desde $1,599,000', link: '/scooters'   },
                { img: '/imgs/Ricochet.jpeg',   title: 'Triciclos Eléctricos', price: 'Desde $4,299,000', link: '/triciclos'  },
              ].map(cat => (
                <Link
                  key={cat.link}
                  to={cat.link}
                  className="group block bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-56 bg-white flex items-center justify-center p-8 overflow-hidden rounded-t-2xl">
                    <img src={cat.img} alt={cat.title} className="max-h-full w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300" />
                  </div>
                  <div className="px-6 py-5 border-t border-[#F1F5F9]">
                    <h3 className="text-[#111827] text-lg font-medium mb-2">{cat.title}</h3>
                    <p className="text-[#374151] text-base font-medium mb-4">{cat.price}</p>
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[#D1D5DB] text-[#374151] text-sm font-medium group-hover:border-[#9CA3AF] group-hover:text-[#111827] transition-colors">
                      Ver categoría
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          5. FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1220] py-36 border-t border-[#1e2d42]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.5em] block mb-8">Movilidad Libre</span>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F9FAFB] leading-[1.05] tracking-tight mb-6">
            El futuro se mueve<br />en silencio.
          </h2>
          <p className="text-[#9CA3AF] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto font-medium">
            Descubre la colección completa de vehículos eléctricos.
          </p>
          <Link to="/bicicletas" className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#2E9ED4] to-[#1e7fab] text-white px-10 py-4 rounded-xl font-semibold text-base hover:from-[#00BFFF] hover:to-[#2E9ED4] transition-all duration-300 shadow-glow hover:shadow-glow">
            Explorar la colección <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
