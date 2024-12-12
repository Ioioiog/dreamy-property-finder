import { X } from 'lucide-react';

interface GalleryHeaderProps {
  title: string;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
}

export const GalleryHeader = ({
  title,
  currentIndex,
  totalImages,
  onClose,
}: GalleryHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-3 sm:p-4 border-b bg-white">
      <h3 className="text-sm sm:text-xl font-semibold text-property-stone truncate">
        {title} - Image {currentIndex + 1}/{totalImages}
      </h3>
      <button
        onClick={onClose}
        className="p-1.5 hover:bg-property-cream rounded-full transition-colors"
        aria-label="Close gallery"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-property-stone" />
      </button>
    </div>
  );
};