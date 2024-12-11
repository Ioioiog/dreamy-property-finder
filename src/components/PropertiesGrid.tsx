import { PropertyCard } from './PropertyCard';

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Luxury Penthouse',
    price: '€450,000',
    beds: 3,
    baths: 2,
    sqm: 150,
    location: 'Central District, Bucharest',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Modern Villa',
    price: '€380,000',
    beds: 4,
    baths: 3,
    sqm: 200,
    location: 'North Area, Bucharest',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Garden Apartment',
    price: '€295,000',
    beds: 2,
    baths: 2,
    sqm: 120,
    location: 'Floreasca, Bucharest',
  },
];

export const PropertiesGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
};