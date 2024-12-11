import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { use360Viewer } from '@/hooks/use360Viewer';
import ViewerHeader from './360/ViewerHeader';
import ViewerControls from './360/ViewerControls';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  const {
    currentImageIndex,
    totalImages,
    nextImage,
    previousImage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = use360Viewer(propertyId);

  if (!isOpen || totalImages === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogTitle className="sr-only">
          360° View of Property
        </DialogTitle>
        <div className="h-full flex flex-col">
          <ViewerHeader
            currentImageIndex={currentImageIndex}
            totalImages={totalImages}
            onClose={onClose}
          />

          <div 
            className="flex-1 relative flex items-center justify-center bg-property-cream"
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
            <ViewerControls
              onPrevious={previousImage}
              onNext={nextImage}
            />

            <img
              src={`/assets/360/${propertyId}/image-${currentImageIndex}.jpg`}
              alt={`360° view position ${currentImageIndex} of ${totalImages}`}
              className="max-h-[70vh] max-w-[90vw] object-contain select-none"
              draggable={false}
            />
          </div>

          <div className="p-4 text-center text-sm text-gray-600 border-t">
            Trageți spre stânga sau dreapta pentru a roti vederea, sau folosiți butoanele săgeată
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}