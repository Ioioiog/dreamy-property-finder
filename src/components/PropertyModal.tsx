import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from '@/types/property';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onOpenGallery: () => void;
}

export default function PropertyModal({ property, onClose, onOpenGallery }: PropertyModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                {property.details.rooms} camere • {property.details.area} mp
              </div>
              <div className="text-2xl font-bold text-brand-orange">
                {property.price}€
              </div>
            </div>
            
            <p className="text-gray-600">{property.description}</p>
            
            <div className="flex gap-4">
              <Button onClick={onOpenGallery} variant="outline" className="flex-1">
                Vezi galerie foto
              </Button>
              <Button className="flex-1">Programează vizionare</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}