import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';
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
  const [touchStart, setTouchStart] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();

  const fallbackImage = '/public/placeholder.svg';

  // Memoize image URLs to prevent unnecessary recalculations
  const imageUrls = useMemo(() => {
    if (!property) return [];
    return property.images.map(image => `/assets/images/properties/${property.id}/${image}`);
  }, [property]);

  // Reset state when property changes
  useEffect(() => {
    if (property) {
      setCurrentIndex(0);
      setLoadedImages(new Set());
    }
  }, [property]);

  // Preload adjacent images
  useEffect(() => {
    if (!imageUrls.length) return;

    const preloadImage = (index: number) => {
      if (index < 0 || index >= imageUrls.length || loadedImages.has(index)) return;
      
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, index]));
      };
      img.src = imageUrls[index];
    };

    // Preload current image and adjacent ones
    preloadImage(currentIndex);
    preloadImage(currentIndex + 1);
    preloadImage(currentIndex - 1);
  }, [currentIndex, imageUrls, loadedImages]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 40) {
      setCurrentIndex(prev => {
        if (touchDiff > 0) {
          return (prev + 1) % imageUrls.length;
        }
        return (prev - 1 + imageUrls.length) % imageUrls.length;
      });
    }
  }, [touchStart, imageUrls.length]);

  const handleImageSelect = useCallback((index: number) => {
    requestAnimationFrame(() => {
      setCurrentIndex(index);
    });
  }, []);

  // Memoize thumbnail style
  const thumbnailStyle = useMemo(() => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    opacity: '0',
    transition: 'opacity 0.2s ease-in-out',
  }), []);

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-[100vh] sm:h-[90vh] max-w-6xl p-0">
        <div className="flex flex-col h-full bg-black">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-white">
            <h3 className="text-sm sm:text-lg font-medium truncate pr-4">
              {property.title} - {currentIndex + 1}/{imageUrls.length}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row h-full">
            {/* Main Image */}
            <div 
              className={`
                ${isMobile ? 'h-[70vh]' : 'flex-1 min-h-0'}
                relative flex items-center justify-center bg-black p-2
              `}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {imageUrls.map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`${property.title} - Image ${index + 1}`}
                  className={`
                    absolute inset-0 m-auto max-h-full max-w-full object-contain
                    transition-opacity duration-300
                    ${currentIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}
                  loading={Math.abs(currentIndex - index) <= 1 ? "eager" : "lazy"}
                  decoding="async"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                  draggable={false}
                />
              ))}
            </div>

            {/* Preview Strip */}
            <div 
              className={`
                ${isMobile ? 'h-auto overflow-x-auto' : 'w-32 overflow-y-auto'}
                bg-white p-2 flex ${isMobile ? 'flex-row' : 'flex-col'}
                gap-2
              `}
            >
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`
                    ${isMobile ? 'w-20 h-20' : 'w-28 h-28'}
                    flex-shrink-0 rounded-lg overflow-hidden
                    transition-all duration-200 bg-gray-100
                    ${currentIndex === index 
                      ? 'ring-2 ring-blue-500 opacity-100' 
                      : 'opacity-60 hover:opacity-100'
                    }
                  `}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={currentIndex === index}
                >
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    style={thumbnailStyle}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    }}
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
