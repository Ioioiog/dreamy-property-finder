import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-property-stone h-screen">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/8ae6d84e-b054-4f7e-8528-391d7b7793c5.png"
          alt="Apartament de lux cu priveliște panoramică"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-property-stone/80 to-property-stone/60"></div>
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Descoperă Apartamentul Perfect în București
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Oferim proprietăți exclusiviste în zonele premium ale capitalei, perfecte pentru cei care caută un stil de viață luxos și confortabil.
            </p>
            <a
              href="#properties"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-property-gold hover:bg-property-gold/90 transition-colors duration-300"
            >
              Vezi Proprietățile Noastre
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;