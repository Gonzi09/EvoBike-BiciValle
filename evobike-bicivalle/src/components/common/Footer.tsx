import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MOVILLIBRE</h3>
            <p className="text-gray-400">
              Movilidad eléctrica del futuro. Sostenible, eficiente y con estilo.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Tienda</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/bicicletas" className="text-gray-400 hover:text-white transition-colors">
                  Bicicletas Eléctricas
                </Link>
              </li>
              <li>
                <Link to="/scooters" className="text-gray-400 hover:text-white transition-colors">
                  Scooters Eléctricos
                </Link>
              </li>
              <li>
                <Link to="/triciclos" className="text-gray-400 hover:text-white transition-colors">
                  Triciclos Eléctricos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>Av. Roosevelt #25-68 local 104, 3 de Julio, Cali, Valle del Cauca, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5" />
                +57 318 4128902
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5" />
                contacto.movilidadlibre@gmail.com
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Movilidad Libre. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;