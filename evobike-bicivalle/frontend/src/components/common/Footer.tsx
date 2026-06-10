import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1220] text-white py-14 border-t border-[#1e2d42]" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-7 h-7 bg-gradient-to-br from-[#2E9ED4] to-[#1a5f8f] rounded-lg"></div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Movilidad<span className="text-[#2E9ED4]">Libre</span>
              </h3>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Movilidad eléctrica del futuro. Sostenible, eficiente y con estilo.
            </p>
          </div>

          {/* Store links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Tienda</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/bicicletas" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Bicicletas Eléctricas
                </Link>
              </li>
              <li>
                <Link to="/scooters" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Scooters Eléctricos
                </Link>
              </li>
              <li>
                <Link to="/triciclos" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Triciclos Eléctricos
                </Link>
              </li>
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Información</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#2E9ED4] transition-colors text-sm">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-gray-400 text-[13px] leading-relaxed min-w-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#2E9ED4]" />
                <span className="min-w-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>Av. Roosevelt #25-68 local 104, 3 de Julio, Cali, Valle del Cauca</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400 text-[13px] leading-relaxed min-w-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                <Phone className="w-4 h-4 flex-shrink-0 text-[#2E9ED4]" />
                +57 318 4128902
              </li>
              <li className="flex items-start gap-2.5 text-gray-400 text-[13px] leading-relaxed min-w-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                <Mail className="w-4 h-4 flex-shrink-0 text-[#2E9ED4]" />
                <span className="min-w-0" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>contacto.movilidadlibre@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1e2d42] mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Movilidad Libre. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
