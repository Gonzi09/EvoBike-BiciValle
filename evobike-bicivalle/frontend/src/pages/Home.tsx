import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../utils/api';

const Home: React.FC = () => {
  /* ─── ALL LOGIC UNCHANGED ─────────────────────────────── */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      image: '/imgs/Bicis.webp',
      eyebrow: 'Bicicletas Eléctricas',
      title: 'Silencio\nen movimiento.',
      description: 'Potencia y estilo para la ciudad. El motor que nunca escucharás.',
      link: '/bicicletas',
    },
    {
      image: '/imgs/Patineta-Evobike.webp',
      eyebrow: 'Scooters Eléctricos',
      title: 'Ágil.\nLibre.\nEléctrico.',
      description: 'Movilidad urbana sin límites. Compacto, veloz, sin emisiones.',
      link: '/scooters',
    },
    {
      image: '/imgs/Triciclos.webp',
      eyebrow: 'Triciclos Eléctricos',
      title: 'Más carga.\nMás alcance.',
      description: 'Estabilidad y capacidad de carga para el trabajo del día a día.',
      link: '/triciclos',
    },
  ];

  useEffect(() => {
    loadPopularProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
            className="flex flex-col lg:grid lg:grid-cols-12 lg:items-center py-8 md:py-12 lg:py-0 gap-4 md:gap-6 lg:gap-4"
            style={{ gridAutoRows: 'minmax(auto, 1fr)', minHeight: 'auto', lg: { minHeight: '100vh' } }}
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
                      fontSize: 'clamp(1.75rem, 5vw, 4.25rem)',
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
              <p style={{ color: '#9CA3AF', fontSize: 'clamp(13px, 2.5vw, 13px)', lineHeight: 1.6, marginBottom: '16px' }} className="text-center lg:text-left">
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
                  className="relative inline-flex items-center justify-center gap-2.5 text-white text-[12px] sm:text-[13px] font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl"
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
                  src="/imgs/zeusfondo.png"
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

              {/* ── Controls — hidden on mobile ── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '4%',
                  left: 0,
                  right: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  zIndex: 15,
                }}
                className="hidden md:flex"
              >
                {/* Nav + 360° */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <button
                    onClick={prevSlide}
                    aria-label="Anterior"
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: '1px solid rgba(30,45,66,0.75)',
                      background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#2A3B4C', cursor: 'pointer',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#2E9ED4'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(46,158,212,0.45)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#2A3B4C'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,45,66,0.75)'; }}
                  >
                    <ChevronLeft style={{ width: '15px', height: '15px' }} />
                  </button>

                  {/* 360° ring */}
                  <div style={{ position: 'relative', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(46,158,212,0.18)' }} />
                    <div style={{
                      position: 'absolute', inset: '3px', borderRadius: '50%',
                      border: '1px solid transparent',
                      borderTopColor: 'rgba(46,158,212,0.72)',
                      borderRightColor: 'rgba(46,158,212,0.18)',
                      animation: 'spin 7s linear infinite',
                    }} />
                    <span style={{ color: '#2E9ED4', fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em' }}>360°</span>
                  </div>

                  <button
                    onClick={nextSlide}
                    aria-label="Siguiente"
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: '1px solid rgba(30,45,66,0.75)',
                      background: 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#2A3B4C', cursor: 'pointer',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#2E9ED4'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(46,158,212,0.45)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#2A3B4C'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,45,66,0.75)'; }}
                  >
                    <ChevronRight style={{ width: '15px', height: '15px' }} />
                  </button>
                </div>

                {/* Counter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#2E9ED4', fontSize: '10px', fontWeight: 700, fontFamily: 'monospace' }}>0{currentSlide + 1}</span>
                  <div style={{ width: '28px', height: '1px', background: 'rgba(30,45,66,0.9)' }} />
                  <span style={{ color: '#1F2D3D', fontSize: '10px', fontFamily: 'monospace' }}>0{slides.length}</span>
                </div>
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
      <section className="bg-[#0B1220] py-24 border-b border-[#1e2d42]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="overflow-hidden rounded-2xl bg-[#111827] aspect-[4/3]">
              <img src={slides[0].image} alt={slides[0].eyebrow} className="w-full h-full object-cover" />
            </div>

            <div className="lg:pl-8">
              <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Más Vendido</span>
              <h2 className="text-4xl font-bold text-[#F9FAFB] tracking-tight mb-4">Bicicletas<br />Eléctricas</h2>
              <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-8 max-w-sm">
                Diseñadas para la ciudad. Silenciosas, eficientes y con estilo que convierte cada trayecto en una experiencia.
              </p>
              <div className="space-y-3 mb-8">
                {[{ label: 'Motor', value: 'Alta eficiencia' }, { label: 'Batería', value: 'Larga duración' }, { label: 'Garantía', value: '1 año completo' }].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-[#1e2d42]">
                    <span className="text-[#9CA3AF] text-sm">{label}</span>
                    <span className="text-[#F9FAFB] text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <p className="text-[#9CA3AF] text-xs mb-0.5">Desde</p>
                  <p className="text-2xl font-bold text-[#111827]">$2.100.000</p>
                </div>
                <Link to="/bicicletas" className="inline-flex items-center gap-2 bg-[#2E9ED4] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#00BFFF] transition-colors duration-200">
                  Ver modelos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3. VALUE PROPOSITION
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#111827] py-24 border-b border-[#1e2d42]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">Por qué elegirnos</span>
            <h2 className="text-4xl font-bold text-[#F9FAFB] tracking-tight">Movilidad que importa</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0B1220] rounded-2xl overflow-hidden">
            {[
              { num: '01', title: 'Potencia real', body: 'Motores de última generación diseñados para el uso urbano diario con máximo rendimiento.' },
              { num: '02', title: 'Sin preocupaciones', body: '1 año de garantía completa y soporte técnico especializado en cada producto.' },
              { num: '03', title: 'Entrega nacional', body: 'Enviamos a cualquier ciudad del país sin costo adicional, con seguimiento en tiempo real.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="bg-[#0B1220] glass-sm px-10 py-12">
                <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-5">{num}</span>
                <h3 className="text-lg font-bold text-[#F9FAFB] mb-3">{title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          4. PRODUCT GRID
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0B1220] py-24 border-b border-[#1e2d42]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#2E9ED4] text-[11px] font-bold uppercase tracking-[0.4em] block mb-3">Colección</span>
              <h2 className="text-4xl font-bold text-[#F9FAFB] tracking-tight">Productos Destacados</h2>
            </div>
            <Link to="/bicicletas" className="text-sm text-[#9CA3AF] hover:text-[#2E9ED4] transition-colors flex items-center gap-1 group">
              Ver todo <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3">
              <div className="w-6 h-6 border-2 border-[#2E9ED4] border-t-transparent rounded-full animate-spin" />
              <span className="text-[#9CA3AF] text-sm">Cargando...</span>
            </div>
          ) : popularProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { img: '/imgs/Bicis.webp',           title: 'Bicicletas Eléctricas', price: 'Desde $2,100,000', link: '/bicicletas' },
                { img: '/imgs/Patineta-Evobike.webp', title: 'Scooters Eléctricos',  price: 'Desde $1,599,000', link: '/scooters'   },
                { img: '/imgs/Triciclos.webp',         title: 'Triciclos Eléctricos', price: 'Desde $4,299,000', link: '/triciclos'  },
              ].map(cat => (
                <Link key={cat.link} to={cat.link} className="group block bg-[#111827] glass rounded-2xl overflow-hidden border border-[#1e2d42] hover:shadow-glow transition-all duration-300">
                  <div className="h-56 overflow-hidden bg-[#0B1220]">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  </div>
                  <div className="px-6 py-5 border-t border-[#1e2d42]">
                    <h3 className="font-bold text-[#F9FAFB] mb-1 text-[15px]">{cat.title}</h3>
                    <p className="text-[#9CA3AF] text-sm">{cat.price}</p>
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
          <h2 className="text-5xl md:text-[3.75rem] font-bold text-[#F9FAFB] leading-[1.05] tracking-tight mb-5">
            El futuro se mueve<br />en silencio.
          </h2>
          <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
            Descubre la colección completa de vehículos eléctricos.
          </p>
          <Link to="/bicicletas" className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#2E9ED4] to-[#1e7fab] text-white px-9 py-4 rounded-xl font-semibold text-sm hover:from-[#00BFFF] hover:to-[#2E9ED4] transition-all duration-300 shadow-glow hover:shadow-glow">
            Explorar la colección <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
