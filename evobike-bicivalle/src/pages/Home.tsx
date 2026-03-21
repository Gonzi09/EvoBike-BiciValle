import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Zap, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../utils/api';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      image: '/imgs/Bicis.webp',
      title: 'Bicicletas Eléctricas',
      description: 'Potencia y estilo para la ciudad',
      link: '/bicicletas',
    },
    {
      image: '/imgs/Patineta-Evobike.webp',
      title: 'Scooters Eléctricos',
      description: 'Movilidad ágil y eficiente',
      link: '/scooters',
    },
    {
      image: '/imgs/Triciclos.webp',
      title: 'Triciclos Eléctricos',
      description: 'Estabilidad y capacidad de carga',
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideLink = slides[currentSlide]?.link || '/bicicletas';

  return (
    <div className="min-h-screen">
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl ml-auto text-right">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-2xl md:text-3xl mb-8 text-gray-200">
                {slides[currentSlide].description}
              </p>
              <Link
                to={currentSlideLink}
                className="inline-flex items-center gap-3 bg-pink-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-pink-600 transition-all shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105"
              >
                Explorar colección
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Zap className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Potencia y Rendimiento</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Motores de alta eficiencia y baterías de larga duración
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Garantía Total</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                1 año de garantía en todos nuestros productos
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Truck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Envío Gratis</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Envío sin costo a todo el país
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600">Los más vendidos de nuestra colección</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">Cargando productos...</div>
            </div>
          ) : popularProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  to="/bicicletas"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Ver todos los productos
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <img src="/imgs/Bicis.webp" alt="Bicicletas" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Bicicletas Eléctricas</h3>
                  <p className="text-gray-600 mb-4">Desde $2,100,000</p>
                  <Link
                    to="/bicicletas"
                    className="text-green-600 font-bold hover:text-green-700"
                  >
                    Ver colección →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <img src="/imgs/Patineta-Evobike.webp" alt="Scooters" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Scooters Eléctricos</h3>
                  <p className="text-gray-600 mb-4">Desde $1,599,000</p>
                  <Link
                    to="/scooters"
                    className="text-green-600 font-bold hover:text-green-700"
                  >
                    Ver colección →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <img src="/imgs/Triciclos.webp" alt="Triciclos" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Triciclos Eléctricos</h3>
                  <p className="text-gray-600 mb-4">Desde $4,299,000</p>
                  <Link
                    to="/triciclos"
                    className="text-green-600 font-bold hover:text-green-700"
                  >
                    Ver colección →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para la movilidad del futuro?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            Descubre nuestra colección completa de vehículos eléctricos
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/bicicletas"
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
            >
              Bicicletas Eléctricas
            </Link>
            <Link
              to="/scooters"
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
            >
              Scooters Eléctricos
            </Link>
            <Link
              to="/triciclos"
              className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
            >
              Triciclos Eléctricos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;