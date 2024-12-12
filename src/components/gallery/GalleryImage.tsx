import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GalleryImageProps {
  imageUrl: string;
  fallbackImage: string;
  isZoomed: boolean;
  onZoomToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export const GalleryImage = ({
  imageUrl,
  fallbackImage,
  isZoomed,
  onZoomToggle,
  onNext,
  onPrev,
  currentIndex,
  totalImages,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}: GalleryImageProps) => {
  const isMobile = useIsMobile();

  return (
    <div 
      className="flex-1 relative flex items-center justify-center bg-property-cream overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isMobile && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 bg-white/90 hover:bg-white 
              shadow-lg rounded-full transition-all duration-200 transform hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-property-stone" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 bg-white/90 hover:bg-white 
              shadow-lg rounded-full transition-all duration-200 transform hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-property-stone" />
          </button>
        </>
      )}

      <div className={`transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
        <img
          src={imageUrl}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          alt={`Image ${currentIndex + 1} of ${totalImages}`}
          className={`max-h-[calc(100svh-12rem)] sm:max-h-[70vh] w-auto max-w-[95vw] sm:max-w-[90vw] 
            object-contain rounded-lg transition-all duration-300 ${isZoomed ? 'pointer-events-none' : ''}`}
        />
      </div>

      {isMobile && (
        <button
          onClick={onZoomToggle}
          className="absolute bottom-4 right-4 z-10 p-3 bg-white/90 rounded-full shadow-lg"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          {isZoomed ? (
            <ZoomOut className="w-6 h-6 text-property-stone" />
          ) : (
            <ZoomIn className="w-6 h-6 text-property-stone" />
          )}
        </button>
      )}
    </div>
  );
};