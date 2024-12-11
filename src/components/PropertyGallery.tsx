import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  images: string[];
}

interface PropertyGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyGallery({ isOpen, onClose, property }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  if (!property) return null;

  const getGitHubImageUrl = (imageName: string) => {
    return `/assets/properties/${property.id}/${imageName}`;
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold text-property-stone">
              {property.title} - Imagine {currentIndex + 1} din {property.images.length}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-property-cream rounded-full transition-colors"
            >
              <X size={24} className="text-property-stone" />
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center px-4 bg-property-cream">
            <button
              onClick={prevImage}
              className="absolute left-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
              aria-label="Imagine anterioară"
            >
              <ChevronLeft size={24} className="text-property-stone" />
            </button>

            <img
              src={imageError[currentIndex] ? '/placeholder.svg' : getGitHubImageUrl(property.images[currentIndex])}
              alt={`${property.title} - Imagine ${currentIndex + 1}`}
              className="max-h-[70vh] max-w-[90vw] object-contain rounded-lg"
              onError={() => handleImageError(currentIndex)}
            />

            <button
              onClick={nextImage}
              className="absolute right-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
              aria-label="Imagine următoare"
            >
              <ChevronRight size={24} className="text-property-stone" />
            </button>
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden 
                    transition-all duration-200 ${
                      currentIndex === index 
                        ? 'ring-2 ring-property-gold scale-105' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                >
                  <img
                    src={imageError[index] ? '/placeholder.svg' : getGitHubImageUrl(image)}
                    alt={`Miniatură ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}