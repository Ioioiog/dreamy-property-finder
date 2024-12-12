import React from 'react';
import { Button } from './ui/button';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contactați-ne</h2>
        <div className="max-w-lg mx-auto">
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Informații Contact</h3>
              <p className="text-gray-600">
                <strong>Email:</strong> reddomainrent@gmail.com<br />
                <strong>Telefon:</strong> +40 744 77 87 92<br />
                <strong>Adresă:</strong> Str. Anton Holban, nr 6, București
              </p>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nume
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-orange focus:ring-property-orange"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-orange focus:ring-property-orange"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-property-orange focus:ring-property-orange"
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-property-orange hover:bg-property-orange-dark text-white">
              Trimite Mesaj
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;