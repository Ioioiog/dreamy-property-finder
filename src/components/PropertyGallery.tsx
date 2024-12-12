import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useIsMobile } from '@/hooks/use-mobile';

interface Property {
  id: string;
  title: string;
  mainImage?: string;
  images: string[];
}

interface PropertyGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyGallery({ isOpen, onClose, property }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageError, setImageError] = useState<boolean[]>([]);
  const isMobile = useIsMobile();

  // Fallback image from Unsplash
  const fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  useEffect(() => {
    if (property) {
      const urls = property.images.map(image => `/assets/images/properties/${property.id}/${image}`);
      console.log('Generated gallery image URLs:', urls);
      setImageUrls(urls);
      setImageError(new Array(urls.length).fill(false));
    }
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  if (!property) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleImageError = (index: number) => {
    console.error('Failed to load gallery image:', imageUrls[index]);
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const swipeThreshold = 50;
    
    if (touch.screenX - (e as any).startX > swipeThreshold) {
      prevImage();
    } else if ((e as any).startX - touch.screenX > swipeThreshold) {
      nextImage();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    (e as any).startX = e.touches[0].screenX;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-7xl ${isMobile ? 'h-[100svh] p-0' : 'h-[90vh] p-0'}`}>
        <DialogTitle className="sr-only">
          Galerie foto pentru {property.title}
        </DialogTitle>
        
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-property-stone truncate pr-2`}>
              {property.title} - Imagine {currentIndex + 1} din {imageUrls.length}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-property-cream rounded-full transition-colors"
              aria-label="Închide galeria"
            >
              <X size={isMobile ? 20 : 24} className="text-property-stone" />
            </button>
          </div>

          <div 
            className="flex-1 relative flex items-center justify-center bg-property-cream"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleSwipe}
          >
            <button
              onClick={prevImage}
              className={`absolute left-2 md:left-4 z-10 p-2 md:p-3 bg-white/90 hover:bg-white shadow-lg 
                rounded-full transition-all duration-200 transform hover:scale-105 ${isMobile ? 'w-10 h-10' : ''}`}
              aria-label="Imagine anterioară"
            >
              <ChevronLeft size={isMobile ? 20 : 24} className="text-property-stone" />
            </button>

            <img
              src={imageError[currentIndex] ? fallbackImage : imageUrls[currentIndex]}
              alt={`${property.title} - Imagine ${currentIndex + 1}`}
              className={`${isMobile ? 'max-h-[80vh] w-full' : 'max-h-[70vh] max-w-[90vw]'} 
                object-contain rounded-lg`}
              onError={() => handleImageError(currentIndex)}
              onLoad={() => console.log('Gallery image loaded successfully:', imageUrls[currentIndex])}
            />

            <button
              onClick={nextImage}
              className={`absolute right-2 md:right-4 z-10 p-2 md:p-3 bg-white/90 hover:bg-white shadow-lg 
                rounded-full transition-all duration-200 transform hover:scale-105 ${isMobile ? 'w-10 h-10' : ''}`}
              aria-label="Imagine următoare"
            >
              <ChevronRight size={isMobile ? 20 : 24} className="text-property-stone" />
            </button>
          </div>

          <div className={`p-2 md:p-4 border-t bg-white ${isMobile ? 'pb-safe' : ''}`}>
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 ${isMobile ? 'w-16 h-16' : 'w-20 h-20'} rounded-lg 
                    overflow-hidden transition-all duration-200 ${
                      currentIndex === index 
                        ? 'ring-2 ring-property-gold scale-105' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  aria-label={`Vezi imaginea ${index + 1}`}
                  aria-pressed={currentIndex === index}
                >
                  <img
                    src={imageError[index] ? fallbackImage : imageUrl}
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
