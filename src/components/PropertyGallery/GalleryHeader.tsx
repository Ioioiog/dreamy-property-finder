import { X } from 'lucide-react';

interface GalleryHeaderProps {
  title: string;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
}

export default function GalleryHeader({ title, currentIndex, totalImages, onClose }: GalleryHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-xl font-semibold text-property-stone">
        {title} - Imagine {currentIndex + 1} din {totalImages}
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