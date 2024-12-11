import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';

interface PropertyGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
}

const PropertyGallery = ({ isOpen, onClose, title, images }: PropertyGalleryProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4 text-white" />
          </button>
          <h2 className="mb-4 text-xl font-semibold">{title}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${title} - Image ${index + 1}`}
                className="aspect-video w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyGallery;