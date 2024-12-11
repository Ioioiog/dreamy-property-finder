import { Dialog, DialogContent } from '../ui/dialog';
import ViewerHeader from './ViewerHeader';
import ViewerControls from './ViewerControls';
import ViewerImage from './ViewerImage';
import { use360Viewer } from '@/hooks/use360Viewer';
import { Loader } from 'lucide-react';

interface ViewerContainerProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ViewerContainer({ isOpen, onClose, propertyId }: ViewerContainerProps) {
  const {
    currentImageIndex,
    totalImages,
    nextImage,
    previousImage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getCurrentImageNumber,
    isLoading
  } = use360Viewer(propertyId);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="h-full flex flex-col">
          <ViewerHeader
            currentImageIndex={currentImageIndex}
            totalImages={totalImages}
            onClose={onClose}
          />

          <div 
            className="flex-1 relative flex items-center justify-center bg-gray-50"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            role="region"
            aria-label="360 degree view control area"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-property-gold" />
                <span className="sr-only">Loading 360° view</span>
              </div>
            ) : (
              <>
                <ViewerControls
                  onPrevious={previousImage}
                  onNext={nextImage}
                />
                <ViewerImage
                  propertyId={propertyId}
                  currentImageNumber={getCurrentImageNumber()}
                  currentIndex={currentImageIndex}
                  totalImages={totalImages}
                />
              </>
            )}
          </div>

          <div className="p-4 text-center text-sm text-gray-600 border-t">
            Drag left or right to rotate the view, or use the arrow buttons
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}