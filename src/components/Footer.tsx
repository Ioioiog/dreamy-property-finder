import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-property-stone text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ApartamentDeLux.ro</h3>
            <p className="text-gray-300">
              Proprietăți de lux în cele mai căutate zone din București
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Proprietăți
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Email: contact@apartamentdelux.ro<br />
              Telefon: +40 721 234 567<br />
              Adresă: Str. Exemplu nr. 1, București
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ApartamentDeLux.ro. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;