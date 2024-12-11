import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from './ui/use-toast';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    // Reset state when property changes
    setCurrentImageIndex(1);
    checkTotalImages();
  }, [propertyId]);

  const checkTotalImages = async () => {
    let count = 0;
    for (let i = 1; i <= 36; i++) {
      try {
        const response = await fetch(`/assets/360/${propertyId}/${i}.jpg`);
        if (response.ok) {
          count = i;
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    
    if (count === 0) {
      toast({
        title: "360° View Not Available",
        description: "The 360° view for this property is not available yet.",
        variant: "destructive"
      });
      onClose();
    }
    
    setTotalImages(count);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev % totalImages) + 1);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen || totalImages === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold text-property-stone">
              360° View - Image {currentImageIndex} of {totalImages}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-property-cream rounded-full transition-colors"
            >
              <X size={24} className="text-property-stone" />
            </button>
          </div>

          {/* Main View */}
          <div 
            className="flex-1 relative flex items-center justify-center bg-property-cream"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <button
              onClick={previousImage}
              className="absolute left-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
              aria-label="Previous view"
            >
              <ChevronLeft size={24} className="text-property-stone" />
            </button>

            <img
              src={`/assets/360/${propertyId}/${currentImageIndex}.jpg`}
              alt={`360° view ${currentImageIndex}`}
              className="max-h-[70vh] max-w-[90vw] object-contain select-none"
              draggable={false}
            />

            <button
              onClick={nextImage}
              className="absolute right-8 p-2 bg-property-gold/10 hover:bg-property-gold/20 rounded-full transition-colors"
              aria-label="Next view"
            >
              <ChevronRight size={24} className="text-property-stone" />
            </button>
          </div>

          {/* Instructions */}
          <div className="p-4 text-center text-sm text-gray-600 border-t">
            Drag left or right to rotate the view, or use the arrow buttons
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}