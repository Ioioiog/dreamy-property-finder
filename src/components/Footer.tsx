import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-property-stone text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ApartamentDeLux.ro</h3>
            <p className="text-gray-300">
              Proprietăți de lux în cele mai căutate zone din București
            </p>
            <div className="mt-4">
              <a
                href="https://www.instagram.com/penthousebucharest/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 space-y-2">
              <a href="mailto:reddomainrent@gmail.com" className="flex items-center hover:text-white transition-colors">
                <Mail className="mr-2" size={20} />
                reddomainrent@gmail.com
              </a>
              <a href="tel:+40744778792" className="flex items-center hover:text-white transition-colors">
                <Phone className="mr-2" size={20} />
                +40 744 77 87 92
              </a>
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Str. Anton Holban, nr 6, București</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {currentYear} ApartamentDeLux.ro. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
