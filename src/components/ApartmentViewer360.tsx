import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';

interface ApartmentViewer360Props {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}

export default function ApartmentViewer360({ isOpen, onClose, propertyId }: ApartmentViewer360Props) {
  console.log('Opening panorama viewer for property:', propertyId);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[80vh] p-0">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold text-property-stone">
              Vizualizare Panoramică
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-property-cream rounded-full transition-colors"
            >
              <X size={24} className="text-property-stone" />
            </button>
          </div>
          
          <div className="flex-1 relative overflow-x-scroll bg-property-cream">
            <img
              src={`/assets/360/${propertyId}/panorama.jpg`}
              alt="Panoramic view"
              className="h-full object-cover"
              style={{
                width: 'auto',
                maxWidth: 'none',
                height: '100%'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}