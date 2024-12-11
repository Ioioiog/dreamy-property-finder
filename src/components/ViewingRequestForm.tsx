import React from 'react';
import { Button } from './ui/button';

const ViewingRequestForm = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Formular Cerere Vizionare</h1>
      <div className="max-w-lg mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nume Complet
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Data Preferată
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
            />
          </div>
          <Button type="submit" className="w-full bg-property-gold hover:bg-property-gold/90">
            Trimite Cererea
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ViewingRequestForm;