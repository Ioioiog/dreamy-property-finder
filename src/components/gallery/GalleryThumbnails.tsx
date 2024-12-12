interface GalleryThumbnailsProps {
  imageUrls: string[];
  currentIndex: number;
  fallbackImage: string;
  onThumbnailClick: (index: number) => void;
}

export const GalleryThumbnails = ({
  imageUrls,
  currentIndex,
  fallbackImage,
  onThumbnailClick,
}: GalleryThumbnailsProps) => {
  return (
    <div className="p-2 sm:p-4 border-t bg-white">
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {imageUrls.map((imageUrl, index) => (
          <button
            key={index}
            onClick={() => onThumbnailClick(index)}
            className={`relative flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 rounded-lg overflow-hidden 
              transition-all duration-200 ${
                currentIndex === index 
                  ? 'ring-2 ring-property-gold scale-105' 
                  : 'opacity-50 hover:opacity-100'
              }`}
            aria-label={`View image ${index + 1}`}
            aria-pressed={currentIndex === index}
          >
            <img
              src={imageUrl}
              onError={(e) => {
                e.currentTarget.src = fallbackImage;
              }}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};