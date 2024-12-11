import { Property, propertyStatuses } from '@/types/property';
import { Rotate3d } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewGallery: (property: Property) => void;
  onViewDetails: (property: Property) => void;
  on360View?: (property: Property) => void;
}

export default function PropertyCard({ 
  property, 
  onViewGallery, 
  onViewDetails,
  on360View 
}: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all">
      <div className="relative h-64 overflow-hidden">
        <img
          src={`../assets/images/properties/${property.id}/1.jpg`}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.status !== propertyStatuses.AVAILABLE && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium 
            bg-black/70 text-white backdrop-blur-sm">
            {property.status === propertyStatuses.RENTED ? 'Închiriat' : 'Rezervat'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 right-4 flex gap-2">
            {on360View && (
              <button
                onClick={() => on360View(property)}
                className="bg-white/90 text-brand-dark px-4 py-2 rounded-md 
                  hover:bg-property-gold hover:text-white transition-colors flex items-center gap-2"
              >
                <Rotate3d size={18} />
                Vedere 360°
              </button>
            )}
            <button
              onClick={() => onViewGallery(property)}
              className="bg-white/90 text-brand-dark px-4 py-2 rounded-md 
                hover:bg-property-gold hover:text-white transition-colors"
            >
              Vezi galerie foto
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-dark mb-2">{property.title}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="text-brand-gray-medium">
            {property.details.rooms} camere • {property.details.area} mp
          </div>
          <div className="text-2xl font-bold text-property-gold">
            {property.price}€
          </div>
        </div>

        <p className="text-brand-gray-medium mb-4 line-clamp-2">
          {property.description}
        </p>

        {property.status === propertyStatuses.AVAILABLE ? (
          <button
            onClick={() => onViewDetails(property)}
            className="w-full px-4 py-2 bg-property-gold text-white rounded-md 
              hover:bg-property-stone transition-colors"
          >
            Vezi detalii
          </button>
        ) : (
          <div className="text-center text-brand-gray-medium text-sm">
            Disponibil din: {property.availableFrom}
          </div>
        )}
      </div>
    </div>
  );
}