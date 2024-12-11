import React from 'react';
import { PropertyCard } from './PropertyCard';

interface PropertyListProps {
  onPropertySelect: (property: any) => void;
}

const PropertyList = ({ onPropertySelect }: PropertyListProps) => {
  const properties = [
    {
      id: 1,
      title: "Penthouse Herastrau",
      price: "€850,000",
      location: "Herastrau, București",
      beds: 4,
      baths: 3,
      sqm: 200,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Proprietăți Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} onClick={() => onPropertySelect(property)}>
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;