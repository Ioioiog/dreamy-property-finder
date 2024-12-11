import React from 'react';
import { Button } from './ui/button';

interface ViewingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}

interface ViewingRequestFormProps {
  onSubmit: (formData: ViewingFormData) => void;
  onClose: () => void;
  propertyTitle: string;
}

const ViewingRequestForm: React.FC<ViewingRequestFormProps> = ({ onSubmit, onClose, propertyTitle }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
      phone: (e.currentTarget.elements.namedItem('phone') as HTMLInputElement).value,
      preferredDate: (e.currentTarget.elements.namedItem('date') as HTMLInputElement).value,
      message: (e.currentTarget.elements.namedItem('message') as HTMLTextAreaElement).value,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-lg rounded-lg shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Programare Vizionare - {propertyTitle}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nume Complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Data Preferată
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mesaj (opțional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Anulează
              </Button>
              <Button type="submit">
                Trimite Cererea
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewingRequestForm;