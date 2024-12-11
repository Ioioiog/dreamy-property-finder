import { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import ViewingRequestForm from './ViewingRequestForm';
import PropertyDetails from './property/PropertyDetails';
import PropertyImageSection from './property/PropertyImageSection';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onOpenGallery: () => void;
}

interface ViewingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
}

export default function PropertyModal({ property, onClose, onOpenGallery }: PropertyModalProps) {
  const [showViewingForm, setShowViewingForm] = useState(false);
  
  if (!property) return null;

  const handleViewingRequest = (formData: ViewingFormData) => {
    const subject = `Cerere vizionare - ${property.title}`;
    const emailBody = `
Cerere vizionare pentru: ${property.title}

Detalii contact:
Nume: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}
Data dorită: ${formData.preferredDate}

Mesaj:
${formData.message}

Detalii proprietate:
Adresa: ${property.location.address}
Complex: ${property.location.complex}
Preț: ${property.price}€
Camere: ${property.details.rooms}
Suprafață: ${property.details.area}mp
Etaj: ${property.details.floor}
Corp: ${property.details.building}
    `;

    window.location.href = `mailto:reddomainrent@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    setShowViewingForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin size={18} className="mr-1" />
                <span>{property.location.address}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Details */}
            <PropertyDetails property={property} />

            {/* Right Column - Image & Price Info */}
            <PropertyImageSection 
              property={property}
              onOpenGallery={onOpenGallery}
            />
          </div>
        </div>
      </div>

      {/* Viewing Request Form Modal */}
      {showViewingForm && (
        <ViewingRequestForm
          onSubmit={handleViewingRequest}
          onClose={() => setShowViewingForm(false)}
          propertyTitle={property.title}
        />
      )}
    </div>
  );
}