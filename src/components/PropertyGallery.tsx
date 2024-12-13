import React, { useState, useEffect } from 'react';
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageError, setImageError] = useState<boolean[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const isMobile = useIsMobile();

  const fallbackImage = '/public/placeholder.svg';

  useEffect(() => {
    if (property) {
      const urls = property.images.map(image => `/assets/images/properties/${property.id}/${image}`);
      setImageUrls(urls);
      setImageError(new Array(urls.length).fill(false));
    }
  }, [property]);

  const handleImageError = (index: number) => {
    const newImageError = [...imageError];
    newImageError[index] = true;
    setImageError(newImageError);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const touchDiff = touchStart - touchEnd;

    if (Math.abs(touchDiff) > 40) {
      if (touchDiff > 0) {
        setCurrentIndex(prev => (prev + 1) % imageUrls.length);
      } else {
        setCurrentIndex(prev => (prev - 1 + imageUrls.length) % imageUrls.length);
      }
    }
  };

  const previewImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  };

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

          {/* Preview Strip - Vertical on desktop, horizontal on mobile */}
          <div className="flex flex-col sm:flex-row h-full">
            <div className={`
              ${isMobile ? 'h-[70vh]' : 'flex-1 min-h-0'}
              relative flex items-center justify-center bg-black p-2
            `}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={imageError[currentIndex] ? fallbackImage : imageUrls[currentIndex]}
                alt={`${property.title} - Image ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
                onError={() => handleImageError(currentIndex)}
                draggable={false}
              />
            </div>

            {/* Preview Strip */}
            <div className={`
              ${isMobile ? 'h-auto overflow-x-auto' : 'w-32 overflow-y-auto'}
              bg-white p-2 flex ${isMobile ? 'flex-row' : 'flex-col'}
              gap-2
            `}>
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`
                    ${isMobile ? 'w-20 h-20' : 'w-28 h-28'}
                    flex-shrink-0 rounded-lg overflow-hidden
                    transition-all duration-200
                    ${currentIndex === index 
                      ? 'ring-2 ring-blue-500 opacity-100' 
                      : 'opacity-60 hover:opacity-100'
                    }
                  `}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={currentIndex === index}
                >
                  <img
                    src={imageError[index] ? fallbackImage : url}
                    alt={`Preview ${index + 1}`}
                    style={previewImageStyle}
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
