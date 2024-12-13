import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();

  const imageUrls = property?.images.map(image => 
    `/assets/images/properties/${property.id}/${image}`
  ) ?? [];

  useEffect(() => {
    if (property) {
      setCurrentIndex(0);
      setLoadedImages(new Set());
    }
  }, [property]);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || !imageUrls.length) return;

    setIsAnimating(true);
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % imageUrls.length;
      }
      return (prev - 1 + imageUrls.length) % imageUrls.length;
    });

    setTimeout(() => setIsAnimating(false), 300);
  }, [imageUrls.length, isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 40) {
      navigate(touchDiff > 0 ? 'next' : 'prev');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, onClose]);

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-[100vh] max-w-full p-0">
        <div className="flex flex-col h-full bg-black">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-white z-10">
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

          {/* Carousel */}
          <div className="relative flex-1 overflow-hidden bg-gray-900">
            <div
              className="absolute inset-0 flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="relative w-full h-full flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="min-w-full h-full flex items-center justify-center"
                    style={{ flex: '0 0 100%' }}
                  >
                    <img
                      src={url}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="max-h-full max-w-full object-contain p-4"
                      loading={Math.abs(currentIndex - index) <= 1 ? 'eager' : 'lazy'}
                      decoding="async"
                      onLoad={() => setLoadedImages(prev => new Set([...prev, index]))}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              {!isMobile && (
                <>
                  <button
                    onClick={() => navigate('prev')}
                    className="absolute left-4 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    disabled={isAnimating}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => navigate('next')}
                    className="absolute right-4 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    disabled={isAnimating}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Responsive Thumbnail Navigation */}
          <div className="bg-white border-t">
            <div className="max-w-full overflow-x-auto px-2 py-3">
              <div className="flex gap-2 justify-center min-w-min">
                {imageUrls.map((url, index) => {
                  const isActive = currentIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`
                        relative flex-shrink-0
                        w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16
                        rounded-lg overflow-hidden
                        transition-all duration-200
                        hover:opacity-100
                        ${isActive ? 'ring-2 ring-blue-500 opacity-100' : 'opacity-60'}
                      `}
                      disabled={isAnimating}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={isActive}
                    >
                      <div className="w-full h-full relative">
                        <img
                          src={url}
                          alt={`Thumbnail ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                        {loadedImages.has(index) && (
                          <div
                            className={`absolute inset-0 bg-black/20 transition-opacity
                              ${isActive ? 'opacity-0' : 'opacity-100'}
                            `}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
