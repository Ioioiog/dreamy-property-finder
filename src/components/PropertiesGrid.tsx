import PropertyCard from './PropertyCard';
import { Property } from '@/types/property';

const properties: Property[] = [
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
      coordinates: [44.426912264449236, 26.11123675633533] as [number, number]
    },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Parking', 'Pool', 'Gym']
  },
  {
    id: 'b2',
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
      complex: 'Green Valley',
      coordinates: [44.43555871126546, 26.103366204191687] as [number, number]
    },
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Garden', 'Garage', 'Fireplace']
  },
  {
    id: 'c3',
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
      complex: 'Floreasca Residence',
      coordinates: [44.42838350522629, 26.103564375902668] as [number, number]
    },
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    amenities: ['Garden', 'Balcony', 'Storage']
  },
];

export const PropertiesGrid = () => {
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
        />
      ))}
    </div>
  );
};
