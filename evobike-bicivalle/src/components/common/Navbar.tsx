import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const navLinks = [
    { name: 'INICIO', path: '/' },
    { name: 'BICICLETAS', path: '/bicicletas' },
    { name: 'SCOOTERS', path: '/scooters' },
    { name: 'TRICICLOS', path: '/triciclos' },
    { name: 'CONTACTO', path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-bg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-green-bright to-primary-green-dark rounded-lg"></div>
            <span className="text-xl font-heading font-bold text-text-primary">
              Movilidad<span className="text-primary-green-bright">Libre</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-accent-fuchsia'
                    : 'text-text-primary hover:text-primary-green-bright'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 hover:bg-primary-surface rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="w-6 h-6 text-text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-fuchsia text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-primary-surface rounded-lg transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-surface border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-accent-fuchsia'
                    : 'text-text-primary hover:text-primary-green-bright'
                }`}
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