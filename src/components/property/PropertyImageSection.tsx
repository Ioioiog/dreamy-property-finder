import { useState } from 'react';
import { Property } from '@/types/property';

interface PropertyImageSectionProps {
  property: Property;
  onOpenGallery: () => void;
}

export default function PropertyImageSection({ property, onOpenGallery }: PropertyImageSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Get the first image from the property's images array
  const mainImage = `/assets/properties/${property.id}/${property.images[0]}`;
  console.log('🖼️ Loading property image:', mainImage);

  return (
    <div>
      <div className="relative rounded-lg overflow-hidden mb-6">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={imageError ? "/placeholder.svg" : mainImage}
          alt={property.title}
          className="w-full h-64 object-cover"
          onLoad={() => {
            console.log('✅ Property image loaded successfully');
            setIsImageLoading(false);
          }}
          onError={() => {
            console.error('❌ Failed to load property image:', mainImage);
            setImageError(true);
            setIsImageLoading(false);
          }}
        />
        <button
          onClick={onOpenGallery}
          className="absolute bottom-4 right-4 bg-white/90 text-brand-dark px-4 py-2 rounded-md 
            hover:bg-brand-orange hover:text-white transition-colors backdrop-blur-sm"
        >
          Vezi toate pozele
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
      </div>
    </div>
  );
}