import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import { propertyData } from '@/data/properties';
import { toast } from '@/components/ui/use-toast';

export const PropertiesGrid = () => {
  const handleViewGallery = (property: Property) => {
    console.log('View gallery for:', property.title);
  };

  const handleViewDetails = (property: Property) => {
    console.log('View details for:', property.title);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {propertyData.map((property) => (
        <PropertyCard 
          key={property.id}
          property={property}
          onViewGallery={handleViewGallery}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};