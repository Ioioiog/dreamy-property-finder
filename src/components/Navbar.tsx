import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo și Branding */}
          <div className="flex-shrink-0 py-4">
            <Link to="/" className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className={`text-2xl font-semibold tracking-tight ${
                  isScrolled ? 'text-property-stone' : 'text-white'
                }`}>
                  apartamentdelux.ro
                </span>
                <span className={`text-xs tracking-wider ${
                  isScrolled ? 'text-property-muted' : 'text-white/80'
                }`}>
                  BEYOND WALLS, EMBRACE YOUR HOME
                </span>
              </div>
            </Link>
          </div>

          {/* Meniu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#properties" 
              className={`font-medium hover:text-property-gold transition-colors ${
                isScrolled ? 'text-property-stone' : 'text-white'
              }`}
            >
              Proprietăți
            </a>
            <a 
              href="#contact" 
              onClick={handleContactClick}
              className={`font-medium hover:text-property-gold transition-colors ${
                isScrolled ? 'text-property-stone' : 'text-white'
              }`}
            >
              Contact
            </a>
            <a
              href="https://chiriasi.apartamentdelux.ro"
              className="px-4 py-2 rounded-md bg-property-orange hover:bg-property-orange-dark text-white transition-colors"
            >
              Portal Chiriași
            </a>
          </div>

          {/* Buton Meniu Mobil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-property-stone' : 'text-white'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Meniu Mobil */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            <div className="px-4 py-2 space-y-3">
              <a 
                href="#properties" 
                className="block px-3 py-2 text-property-stone hover:text-property-gold rounded-md"
              >
                Proprietăți
              </a>
              <a 
                href="#contact"
                onClick={handleContactClick}
                className="block px-3 py-2 text-property-stone hover:text-property-gold rounded-md"
              >
                Contact
              </a>
              <a 
                href="https://chiriasi.apartamentdelux.ro" 
                className="block px-3 py-2 text-white bg-property-orange hover:bg-property-orange-dark rounded-md text-center"
              >
                Portal Chiriași
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}