import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyGalleryProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyGallery({ property, onClose }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [imageError, setImageError] = useState<boolean[]>([]);
  const [scale, setScale] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageUrls = property?.images.map(image => 
    `/assets/images/properties/${property.id}/${image}`
  ) ?? [];

  useEffect(() => {
    if (property) {
      setImageError(new Array(property.images.length).fill(false));
      resetZoom();
    }
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isZoomed) handleNext();
      if (e.key === 'ArrowLeft' && !isZoomed) handlePrev();
      if (e.key === 'Escape') {
        if (isZoomed) {
          resetZoom();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isZoomed]);

  const resetZoom = () => {
    setScale(1);
    setIsZoomed(false);
  };

  const handleNext = () => {
    if (!isZoomed) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      resetZoom();
    }
  };

  const handlePrev = () => {
    if (!isZoomed) {
      setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
      resetZoom();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isZoomed) return;
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 40) {
      if (touchDiff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleImageError = (index: number) => {
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
  };

  const toggleZoom = () => {
    if (isZoomed) {
      resetZoom();
    } else {
      setScale(2);
      setIsZoomed(true);
    }
  };

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              {property.title} - {currentIndex + 1}/{imageUrls.length}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleZoom}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? (
                  <ZoomOut size={20} className="text-gray-600" />
                ) : (
                  <ZoomIn size={20} className="text-gray-600" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close gallery"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div className="relative bg-white flex-1">
            <div 
              className="relative h-[60vh] flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Navigation Buttons */}
              {!isZoomed && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 z-10 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="absolute right-4 z-10 p-3 bg-white hover:bg-gray-100 rounded-full shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div 
                className="w-full h-full flex transition-all duration-300 ease-out cursor-zoom-in"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {imageUrls.map((url, index) => (
                  <div 
                    key={url}
                    className="min-w-full h-full flex items-center justify-center"
                    style={{ flex: '0 0 100%' }}
                    onClick={toggleZoom}
                  >
                    <img
                      src={imageError[index] ? '/placeholder.svg' : url}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="max-h-full max-w-full object-contain p-4 transition-transform duration-300"
                      style={{
                        transform: currentIndex === index ? `scale(${scale})` : 'scale(1)',
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                      }}
                      onError={() => handleImageError(index)}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="bg-white border-t p-4">
            <div className="flex gap-2 overflow-x-auto pb-2 px-2">
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetZoom();
                  }}
                  className={`
                    relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 
                    rounded-lg overflow-hidden transition-all duration-200
                    hover:opacity-100
                    ${currentIndex === index 
                      ? 'ring-2 ring-brand-orange opacity-100 scale-105' 
                      : 'opacity-60'
                    }
                  `}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={currentIndex === index}
                >
                  <img
                    src={imageError[index] ? '/placeholder.svg' : url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
