import React from 'react';
import { Home, Zap, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-property-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-property-stone mb-8">Despre Noi</h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-property-muted">
            ApartamentDeLux.ro este platforma ta de încredere pentru găsirea celor mai exclusiviste 
            proprietăți din București. Ne dedicăm să oferim clienților noștri experiențe de locuire 
            de neegalat, în cele mai prestigioase zone ale capitalei.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-property-gold text-white mx-auto">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-property-stone">Locații Premium</h3>
              <p className="mt-2 text-property-muted">
                Proprietăți în cele mai căutate zone din București
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-property-gold text-white mx-auto">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-property-stone">Rapid</h3>
              <p className="mt-2 text-property-muted">
                Răspundem prompt la toate solicitările clienților
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-property-gold text-white mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-property-stone">Calitate Garantată</h3>
              <p className="mt-2 text-property-muted">
                Toate proprietățile sunt verificate și certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}