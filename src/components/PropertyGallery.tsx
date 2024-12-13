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

interface TouchVelocity {
  x: number;
  y: number;
  time: number;
}

const imgStyles = {
  maxWidth: '100%',
  maxHeight: '90vh',
  objectFit: 'contain',
  userSelect: 'none',
  WebkitUserSelect: 'none',
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
  const [isLoading, setIsLoading] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [touchVelocity, setTouchVelocity] = useState<TouchVelocity>({ x: 0, y: 0, time: 0 });
  
  const isMobile = useIsMobile();
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialTouchRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const fallbackImage = '/public/placeholder.svg';
  const DOUBLE_TAP_DELAY = 300; // ms
  const SWIPE_THRESHOLD = 50; // px
  const VELOCITY_THRESHOLD = 0.5; // px/ms

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
    setIsPanning(false);
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

  const handleDoubleTap = (e: React.TouchEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
      e.preventDefault();
      toggleZoom();
    }
    setLastTap(currentTime);
  };

  const nextImage = () => {
    if (!isPanning && scale === 1) {
      setIsLoading(true);
      setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
      resetZoomAndPan();
    }
  };

  const prevImage = () => {
    if (!isPanning && scale === 1) {
      setIsLoading(true);
      setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
      resetZoomAndPan();
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = (index: number) => {
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
    setIsLoading(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    initialTouchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDistance(distance);
    } else if (e.touches.length === 1) {
      setIsPanning(true);
      handleDoubleTap(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && initialPinchDistance > 0) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.max(1, Math.min(3, (distance / initialPinchDistance) * scale));
      setScale(newScale);
      setIsZoomed(newScale > 1);
    } else if (e.touches.length === 1 && isPanning) {
      const touch = e.touches[0];
      
      if (initialTouchRef.current) {
        const deltaX = touch.clientX - initialTouchRef.current.x;
        const deltaY = touch.clientY - initialTouchRef.current.y;
        const deltaTime = Date.now() - initialTouchRef.current.time;

        setTouchVelocity({
          x: deltaX / deltaTime,
          y: deltaY / deltaTime,
          time: deltaTime
        });

        if (scale > 1) {
          const boundingRect = containerRef.current?.getBoundingClientRect();
          if (boundingRect) {
            const maxPanX = (boundingRect.width * (scale - 1)) / 2;
            const maxPanY = (boundingRect.height * (scale - 1)) / 2;
            
            setPanPosition({
              x: Math.max(-maxPanX, Math.min(maxPanX, deltaX)),
              y: Math.max(-maxPanY, Math.min(maxPanY, deltaY))
            });
          }
        }
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0 && initialTouchRef.current) {
      const deltaTime = Date.now() - initialTouchRef.current.time;
      
      if (scale === 1 && deltaTime < 300) {
        const deltaX = touchVelocity.x * touchVelocity.time;
        
        if (Math.abs(deltaX) > SWIPE_THRESHOLD || Math.abs(touchVelocity.x) > VELOCITY_THRESHOLD) {
          if (deltaX > 0) {
            prevImage();
          } else {
            nextImage();
          }
        }
      }
      
      setIsPanning(false);
      setInitialPinchDistance(0);
      initialTouchRef.current = null;
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
      <DialogContent className="max-w-full sm:max-w-7xl h-full sm:h-[90vh] p-0 m-0 sm:m-4 overflow-hidden">
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

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-property-cream/50">
                <div className="w-8 h-8 border-4 border-property-gold border-t-transparent rounded-full animate-spin" />
              </div>
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
                style={imgStyles}
                onError={() => handleImageError(currentIndex)}
                onLoad={handleImageLoad}
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
