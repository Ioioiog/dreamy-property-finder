import { useState } from 'react';
import { X, MapPin, Home, Square, ArrowUpDown, Building, Eye, Year } from 'lucide-react';
import ViewingRequestForm from './ViewingRequestForm';
import { Property, propertyStatuses } from '@/data/properties';

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
  const [imageError, setImageError] = useState(false);
  
  if (!property) return null;

  const mainImagePath = property.mainImage 
    ? `/assets/images/properties/${property.id}/${property.mainImage}`
    : `/assets/images/properties/${property.id}/1.jpg`;

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
    <>
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informații Generale</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Home className="w-5 h-5 text-brand-orange mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Număr camere</p>
                        <p className="font-medium">{property.details.rooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-5 h-5 text-brand-orange mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Suprafață utilă</p>
                        <p className="font-medium">{property.details.area} mp</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ArrowUpDown className="w-5 h-5 text-brand-orange mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Etaj</p>
                        <p className="font-medium">{property.details.floor}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-brand-orange mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Corp</p>
                        <p className="font-medium">{property.details.building}</p>
                      </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Descriere</h3>
                  <p className="text-gray-600">{property.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilități</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Image & Price Info */}
              <div>
                <div className="relative rounded-lg overflow-hidden mb-6">
                  <img
                    src={imageError ? '/placeholder.svg' : mainImagePath}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                    onError={() => {
                      console.error('Failed to load image:', mainImagePath);
                      setImageError(true);
                    }}
                    onLoad={() => console.log('Image loaded successfully:', mainImagePath)}
                  />
                  <button
                    onClick={onOpenGallery}
                    className="absolute bottom-4 right-4 bg-white/90 text-property-stone px-4 py-2 rounded-md 
                      hover:bg-property-orange hover:text-white transition-colors backdrop-blur-sm flex items-center gap-2"
                  >
                    <Eye size={18} />
                    Vezi galeria foto ({property.images.length})
                  </button>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Preț chirie</span>
                    <span className="text-3xl font-bold text-brand-orange">{property.price}€</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Complex</span>
                      <span className="font-medium">{property.location.complex}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Suprafață totală</span>
                      <span className="font-medium">{property.details.totalArea} mp</span>
                    </div>
                    {property.details.balcony && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Suprafață balcon</span>
                        <span className="font-medium">{property.details.balcony} mp</span>
                      </div>
                    )}
                  </div>
                  {property.status === propertyStatuses.AVAILABLE && (
                     <button    
                     onClick={() => setShowViewingForm(true)}
                     className="w-full mt-6 px-4 py-2 bg-brand-orange text-white rounded-md hover:bg-brand-orange-dark transition-colors"
                     style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkorange'}
                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'orange'}
                   >
                      Programează vizionare
                     </button>
                    )}
                </div>
              </div>
            </div>
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
    </>
  );
}
