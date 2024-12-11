import { Property } from '@/types/property';
import { Home, Square, ArrowUpDown, Building } from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
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
  );
}