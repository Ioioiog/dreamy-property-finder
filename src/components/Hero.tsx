import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Property, propertyStatuses } from '@/data/properties';


const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProperties = () => {
    const element = document.getElementById('properties');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-property-stone min-h-screen">
      <div className="absolute inset-0">
        <img
          src="/hero/8ae6d84e-b054-4f7e-8528-391d7b7793c5.png"
          alt="Apartament de lux cu priveliște panoramică"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-property-stone/90 to-property-stone/70"
          aria-hidden="true"
        />
      </div>
      
      <div className="relative h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Descoperă Apartamentul Perfect în București
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Oferim proprietăți exclusiviste în zonele premium ale capitalei, perfecte pentru cei care caută un stil de viață luxos și confortabil.
            </p>
            <motion.a
              href="#properties"
              onClick={(e) => {
                e.preventDefault();
                scrollToProperties();
              }}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-property-orange hover:bg-property-orange-dark transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Vezi proprietățile noastre disponibile"
            >
              Vezi Proprietățile Noastre
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.button
          onClick={scrollToProperties}
          className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Scroll pentru a vedea proprietățile"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;