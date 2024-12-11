interface GalleryThumbnailsProps {
  images: string[];
  currentIndex: number;
  onSelect: (index: number) => void;
  propertyId: string;
  imageError: Record<number, boolean>;
}

export default function GalleryThumbnails({ 
  images, 
  currentIndex, 
  onSelect,
  propertyId,
  imageError 
}: GalleryThumbnailsProps) {
  const getGitHubImageUrl = (imageName: string) => {
    return `/assets/properties/${propertyId}/${imageName}`;
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden 
              transition-all duration-200 ${
                currentIndex === index 
                  ? 'ring-2 ring-property-gold scale-105' 
                  : 'opacity-50 hover:opacity-100'
              }`}
          >
            <img
              src={imageError[index] ? '/placeholder.svg' : getGitHubImageUrl(image)}
              alt={`Miniatură ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}