import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';
import { toast } from '@/components/ui/use-toast';

const properties = [
  {
    id: 'a25',
    title: 'Luxury Penthouse',
    price: 450000,
    description: 'Luxurious penthouse with amazing views',
    status: 'available',
    details: {
      rooms: 3,
      area: 150,
      totalArea: 180,
      floor: '10',
      building: 'A'
    },
    location: {
      address: 'Central District, Bucharest',
      complex: 'Luxury Towers',
      coordinates: [44.426912264449236, 26.11123675633533]
    },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Parking', 'Pool', 'Gym']
  },
  {
    id: 2,
    title: 'Modern Villa',
    price: 380000,
    description: 'Spacious modern villa with garden',
    status: 'available',
    details: {
      rooms: 4,
      area: 200,
      totalArea: 250,
      floor: '1',
      building: 'B'
    },
    location: {
      address: 'North Area, Bucharest',
      complex: 'Green Valley'
    },
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Garden', 'Garage', 'Fireplace']
  },
  {
    id: 3,
    title: 'Garden Apartment',
    price: 295000,
    description: 'Cozy apartment with a beautiful garden',
    status: 'available',
    details: {
      rooms: 2,
      area: 120,
      totalArea: 140,
      floor: 'Ground',
      building: 'C'
    },
    location: {
      address: 'Floreasca, Bucharest',
      complex: 'Floreasca Residence'
    },
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Garden', 'Balcony', 'Storage']
  },
];

export const PropertiesGrid = () => {
  const handle360View = (property: Property) => {
    toast({
      title: "360° View Coming Soon",
      description: `360° view for ${property.title} will be available soon.`,
    });
  };

  const handleViewGallery = (property: Property) => {
    console.log('View gallery for:', property.title);
  };

  const handleViewDetails = (property: Property) => {
    console.log('View details for:', property.title);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard 
          key={property.id}
          property={property}
          onViewGallery={handleViewGallery}
          onViewDetails={handleViewDetails}
          on360View={handle360View}
        />
      ))}
    </div>
  );
};