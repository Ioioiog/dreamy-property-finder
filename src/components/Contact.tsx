import React from 'react';
import { Button } from './ui/button';

const Contact = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contactați-ne</h2>
        <div className="max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nume
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-gold focus:ring-property-gold"
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-property-gold hover:bg-property-gold/90">
              Trimite Mesaj
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;