import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';
import ImageRotate from 'react-360-view';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  console.log('Opening 360 viewer for property:', propertyId);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold text-property-stone">
              Vizualizare 360°
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-property-cream rounded-full transition-colors"
            >
              <X size={24} className="text-property-stone" />
            </button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center bg-property-cream p-4">
            <ImageRotate
              amount={36}
              imagePath={`/assets/360/${propertyId}/image-`}
              fileName="jpg"
              spinReverse
              autoplay={1}
              loop
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}