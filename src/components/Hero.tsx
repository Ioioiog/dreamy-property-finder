import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[80vh] bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Descoperiți Luxul în București
            </h1>
            <p className="text-xl mb-8">
              Cele mai exclusiviste proprietăți din zonele premium ale capitalei
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;