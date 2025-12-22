import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Leaf, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

// Importar imágenes - Desktop
import TriciclosImg from '../imgs/Triciclos.webp';
import BicicletasImg from '../imgs/Bicis.webp';
import ScootersImg from '../imgs/Patineta-Evobike.webp';

// Importar imágenes - Mobile (responsive)
import TriciclosImgMobile from '../imgs/Triciclos-repsonsive.webp';
import BicicletasImgMobile from '../imgs/Bicis-responsive.webp';
import ScootersImgMobile from '../imgs/Patineta-responisve.webp';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: 'Triciclos Eléctricos',
      description: 'Diseñamos Soluciones Inteligentes Para La Carga, El Transporte Y La Movilidad Sin Esfuerzo.',
      buttonText: 'Descubre más',
      backgroundImage: TriciclosImg,
      backgroundImageMobile: TriciclosImgMobile,
      link: '/triciclos',
      textColor: 'text-white'
    },
    {
      id: 2,
      title: 'Bicicletas Eléctricas',
      description: 'Impulsamos Tu Libertad. Desde Rutas Urbanas Hasta Aventuras Al Aire Libre.',
      buttonText: 'Descubre más',
      backgroundImage: BicicletasImg,
      backgroundImageMobile: BicicletasImgMobile,
      link: '/bicicletas',
      textColor: 'text-white'
    },
    {
      id: 3,
      title: 'Scooters Eléctricos',
      description: 'Redefinimos La Forma De Moverte. Agilidad, Diseño Y Sostenibilidad.',
      buttonText: 'Descubre más',
      backgroundImage: ScootersImg,
      backgroundImageMobile: ScootersImgMobile,
      link: '/scooters',
      textColor: 'text-white'
    },
  ];

  const categories = [
    {
      name: 'Bicicletas Eléctricas',
      description: 'Potencia y autonomía para tus aventuras',
      image: BicicletasImg,
      path: '/bicicletas',
    },
    {
      name: 'Scooters Eléctricos',
      description: 'Agilidad urbana en cada trayecto',
      image: ScootersImg,
      path: '/scooters',
    },
    {
      name: 'Triciclos Eléctricos',
      description: 'Estabilidad y capacidad de carga',
      image: TriciclosImg,
      path: '/triciclos',
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={isMobile ? slide.backgroundImageMobile : slide.backgroundImage}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60"></div>
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-end">
              <div className={`max-w-xl text-right z-20 ${slide.textColor}`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base lg:text-lg mb-6 leading-relaxed drop-shadow-md">
                  {slide.description}
                </p>
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-green-600 transition-all duration-300 shadow-lg"
                >
                  {slide.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? 'w-12 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Zap className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Alta Eficiencia</h3>
              <p className="text-gray-600 text-lg">Tecnología de última generación</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Leaf className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600 text-lg">Cero emisiones contaminantes</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Shield className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Garantía 2 Años</h3>
              <p className="text-gray-600 text-lg">Soporte completo incluido</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Nuestros Productos</h2>
            <p className="text-gray-600 text-xl">Explora nuestra colección de vehículos eléctricos premium</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="group bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                  <img src={category.image} alt={category.name} className="max-h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{category.name}</h3>
                  <p className="text-gray-600 text-lg mb-6">{category.description}</p>
                  <div className="flex items-center text-green-600 font-semibold text-lg">
                    Ver productos
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-green-700 to-green-500">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">¿Listo para la movilidad eléctrica?</h2>
          <p className="text-2xl text-green-50 mb-10">Únete a miles de personas que ya disfrutan de transporte sostenible</p>
          <Link to="/contacto" className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors shadow-xl">
            Contactar Ahora
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-green-600 mb-3">18+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Modelos</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-green-600 mb-3">100%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Eléctricos</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-green-600 mb-3">2</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Años Garantía</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-green-600 mb-3">24/7</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Soporte</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;