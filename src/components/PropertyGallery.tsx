import React, { useState, useEffect, useRef } from 'react';
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

const imgStyles = {
  maxWidth: '100%',
  maxHeight: '90vh',
  objectFit: 'contain',
};

export default function PropertyGallery({ isOpen, onClose, property }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageError, setImageError] = useState<boolean[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [initialPinchDistance, setInitialPinchDistance] = useState(0);
  const [scale, setScale] = useState(1);
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fallbackImage = '/public/placeholder.svg';

  useEffect(() => {
    if (property) {
      const urls = property.images.map(image => `/assets/images/properties/${property.id}/${image}`);
      setImageUrls(urls);
      setImageError(new Array(urls.length).fill(false));
      resetZoomAndPan();
    }
  }, [property]);

  const resetZoomAndPan = () => {
    setIsZoomed(false);
    setScale(1);
    setPanPosition({ x: 0, y: 0 });
    setInitialPinchDistance(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  const nextImage = () => {
    if (!isPanning && scale === 1) {
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      resetZoomAndPan();
    }
  };

  const prevImage = () => {
    if (!isPanning && scale === 1) {
      setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
      resetZoomAndPan();
    }
  };

  const handleImageError = (index: number) => {
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
  };

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDistance(distance);
    } else if (e.touches.length === 1) {
      // Single touch for panning or swiping
      setIsPanning(true);
      const touch = e.touches[0];
      setPanPosition({
        x: panPosition.x,
        y: panPosition.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && initialPinchDistance > 0) {
      // Handle pinch zoom
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.max(1, Math.min(3, (distance / initialPinchDistance) * scale));
      setScale(newScale);
      setIsZoomed(newScale > 1);
    } else if (e.touches.length === 1 && isPanning && scale > 1) {
      // Handle panning when zoomed
      const touch = e.touches[0];
      const boundingRect = containerRef.current?.getBoundingClientRect();
      if (boundingRect) {
        const maxPanX = (boundingRect.width * (scale - 1)) / 2;
        const maxPanY = (boundingRect.height * (scale - 1)) / 2;
        
        setPanPosition({
          x: Math.max(-maxPanX, Math.min(maxPanX, touch.clientX - boundingRect.left)),
          y: Math.max(-maxPanY, Math.min(maxPanY, touch.clientY - boundingRect.top))
        });
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsPanning(false);
      setInitialPinchDistance(0);
      
      // If not zoomed, check for swipe
      if (scale === 1) {
        const swipeThreshold = 50;
        const deltaX = panPosition.x;
        
        if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
            prevImage();
          } else {
            nextImage();
          }
        }
      }
    }
  };

  const toggleZoom = () => {
    if (isZoomed) {
      resetZoomAndPan();
    } else {
      setScale(2);
      setIsZoomed(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full sm:max-w-7xl h-[100vh] sm:h-[90vh] p-0 m-0 sm:m-4 overflow-hidden">
        <DialogTitle className="sr-only">
          Gallery for {property?.title}
        </DialogTitle>
        
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-white">
            <h3 className="text-sm sm:text-xl font-semibold text-property-stone truncate">
              {property?.title} - Image {currentIndex + 1}/{imageUrls.length}
            </h3>
            <div className="flex items-center gap-2">
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
            ref={containerRef}
            className="flex-1 relative flex items-center justify-center bg-property-cream overflow-hidden touch-none"
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
              className="transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${scale}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                touchAction: 'none'
              }}
            >
              <img
                ref={imageRef}
                src={imageError[currentIndex] ? fallbackImage : imageUrls[currentIndex]}
                alt={`${property?.title} - Image ${currentIndex + 1}`}
                style={imgStyles} // Apply the responsive styles here
                onError={() => handleImageError(currentIndex)}
                draggable={false}
              />
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="p-2 sm:p-4 border-t bg-white">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 justify-center">
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetZoomAndPan();
                  }}
                  className={`relative flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 rounded-lg overflow-hidden 
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
