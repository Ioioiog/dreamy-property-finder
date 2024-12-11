import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-property-stone">
            ApartamentDeLux.ro
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-property-stone hover:text-property-gold transition-colors">
              Acasă
            </Link>
            <Link to="/properties" className="text-property-stone hover:text-property-gold transition-colors">
              Proprietăți
            </Link>
            <Link to="/contact" className="text-property-stone hover:text-property-gold transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;