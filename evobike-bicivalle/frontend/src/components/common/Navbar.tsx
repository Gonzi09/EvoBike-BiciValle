import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Bicicletas', path: '/bicicletas' },
    { name: 'Scooters', path: '/scooters' },
    { name: 'Triciclos', path: '/triciclos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-[#2E9ED4]/20 overflow-visible" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 16px rgba(46, 158, 212, 0.1)' }}>
      <div className="w-full px-[24px]">
        <div className="flex items-center h-14 relative">
          <div className="flex items-center flex-shrink-0">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2 transition-all duration-300 hover:scale-105">
              <div className="relative w-6 h-6 rounded-[4px] border border-[#2E9ED4]/60 bg-[#0B1220]/80 animate-pulse-glow">
                <div className="absolute inset-[4px] rounded-[2px] bg-gradient-to-br from-[#2E9ED4] to-[#00BFFF] opacity-90" />
              </div>
              <span className="text-[13px] font-bold tracking-[-0.01em] group-hover:text-glow transition-all duration-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <span className="text-[#F9FAFB]">Movilidad</span><span className="text-[#2E9ED4]">Libre</span>
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center justify-center gap-4 flex-1 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[13px] tracking-[0.14em] uppercase transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#00BFFF] after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(link.path)
                    ? 'text-[#F9FAFB] font-semibold after:w-full'
                    : 'text-[#9CA3AF] font-medium hover:text-[#00BFFF] hover:[text-shadow:0_0_10px_#00BFFF40]'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <Link
              to="/cart"
              className="relative p-2 text-[#9CA3AF]/70 hover:text-[#00BFFF] hover:[text-shadow:0_0_10px_#00BFFF55] transition-all duration-300"
            >
              <ShoppingCart className="w-[18px] h-[18px]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#2E9ED4] text-white
                                 text-[9px] font-bold rounded-full w-3.5 h-3.5
                                 flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#9CA3AF]/70 hover:text-[#00BFFF] transition-colors duration-300"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute left-0 top-full w-full border-t border-[#2E9ED4]/20" style={{ background: '#0B1220' }}>
          <div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block w-full px-6 py-4 text-[13px] tracking-[0.14em] uppercase font-semibold transition-all duration-300 border-b border-[rgba(255,255,255,0.1)] ${
                  isActive(link.path)
                    ? 'text-[#F9FAFB] bg-[#2E9ED414]'
                    : 'text-[#9CA3AF] hover:text-[#00BFFF] hover:bg-[#2E9ED410]'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
