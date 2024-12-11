import { X } from 'lucide-react';

interface ViewerHeaderProps {
  currentImageIndex: number;
  totalImages: number;
  onClose: () => void;
}

export default function ViewerHeader({ currentImageIndex, totalImages, onClose }: ViewerHeaderProps) {
  return (
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
  );
}