import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-surface border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-lg"></div>
              <span className="text-xl font-heading font-bold text-text-primary">
                EVO<span className="text-primary-green-bright">BIKE</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-4">
              Movilidad eléctrica del futuro. Sostenible, eficiente y con estilo.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-text-secondary hover:text-accent-fuchsia transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-fuchsia transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-fuchsia transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-text-primary font-heading font-semibold mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bicicletas" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Bicicletas Eléctricas
                </Link>
              </li>
              <li>
                <Link to="/scooters" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Scooters Eléctricos
                </Link>
              </li>
              <li>
                <Link to="/triciclos" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Triciclos Eléctricos
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-text-primary font-heading font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contacto" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary-green-bright transition-colors duration-200 text-sm">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text-primary font-heading font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Calle 72 #10-51, Bogotá, Colombia</span>
              </li>
              <li className="flex items-center space-x-2 text-text-secondary text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+57 (1) 234-5678</span>
              </li>
              <li className="flex items-center space-x-2 text-text-secondary text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@evobike.com.co</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © 2024 Evobike Premium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;