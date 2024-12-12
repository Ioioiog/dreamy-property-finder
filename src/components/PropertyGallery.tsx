import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const isMobile = useIsMobile();

  const fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  useEffect(() => {
    if (property) {
      const urls = property.images.map(image => `/assets/images/properties/${property.id}/${image}`);
      setImageUrls(urls);
      setImageError(new Array(urls.length).fill(false));
      setIsZoomed(false);
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
    if (!isZoomed) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const prevImage = () => {
    if (!isZoomed) {
      setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };

  const handleImageError = (index: number) => {
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const horizontalSwipe = Math.abs(touchStart.x - touchEnd.x);
    const verticalSwipe = Math.abs(touchStart.y - touchEnd.y);

    // Only handle horizontal swipes if they're more significant than vertical movement
    if (horizontalSwipe > verticalSwipe && horizontalSwipe > swipeThreshold) {
      if (touchStart.x - touchEnd.x > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-7xl h-[100svh] sm:h-[90vh] p-0 m-0 sm:m-4">
        <DialogTitle className="sr-only">
          Gallery for {property.title}
        </DialogTitle>
        
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-white">
            <h3 className="text-sm sm:text-xl font-semibold text-property-stone truncate">
              {property.title} - Image {currentIndex + 1}/{imageUrls.length}
            </h3>
            <div className="flex items-center gap-2">
              {isMobile && (
                <button
                  onClick={toggleZoom}
                  className="p-1.5 hover:bg-property-cream rounded-full transition-colors"
                  aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                >
                  {isZoomed ? (
                    <ZoomOut size={20} className="text-property-stone" />
                  ) : (
                    <ZoomIn size={20} className="text-property-stone" />
                  )}
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-property-cream rounded-full transition-colors"
                aria-label="Close gallery"
              >
                <X size={20} className="text-property-stone" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div 
            className="flex-1 relative flex items-center justify-center bg-property-cream overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {!isMobile && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 bg-white/90 hover:bg-white shadow-lg rounded-full transition-all duration-200 transform hover:scale-105"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-property-stone" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 bg-white/90 hover:bg-white shadow-lg rounded-full transition-all duration-200 transform hover:scale-105"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-property-stone" />
                </button>
              </>
            )}

            <div 
              className={`transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-move' : 'scale-100'
              }`}
            >
              <img
                src={imageError[currentIndex] ? fallbackImage : imageUrls[currentIndex]}
                alt={`${property.title} - Image ${currentIndex + 1}`}
                className={`max-h-[calc(100vh-10rem)] sm:max-h-[70vh] max-w-[95vw] sm:max-w-[90vw] 
                  object-contain rounded-lg transition-all duration-300 ${
                    isZoomed ? 'pointer-events-none' : ''
                  }`}
                onError={() => handleImageError(currentIndex)}
              />
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="p-2 sm:p-4 border-t bg-white">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 justify-center">
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden 
                    transition-all duration-200 ${
                      currentIndex === index 
                        ? 'ring-2 ring-property-gold scale-105' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={currentIndex === index}
                >
                  <img
                    src={imageError[index] ? fallbackImage : imageUrl}
                    alt={`Thumbnail ${index + 1}`}
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
