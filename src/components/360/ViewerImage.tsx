import { useState } from 'react';

interface ViewerImageProps {
  propertyId: string;
  currentImageNumber: number;
  currentIndex: number;
  totalImages: number;
}

export default function ViewerImage({ 
  propertyId, 
  currentImageNumber,
  currentIndex,
  totalImages 
}: ViewerImageProps) {
  const [imageError, setImageError] = useState(false);

  const imagePath = `/assets/360/${propertyId}/image-${currentImageNumber}.jpg`;
  
  console.log(`🖼️ Loading 360° image: ${imagePath}`);

  if (totalImages === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">No 360° images available for this property.</p>
      </div>
    );
  }

  return (
    <img
      src={imageError ? '/placeholder.svg' : imagePath}
      alt={`360° view ${currentIndex} of ${totalImages}`}
      className="max-h-[70vh] max-w-[90vw] object-contain select-none"
      draggable={false}
      onError={() => {
        console.error(`❌ Failed to load image: ${imagePath}`);
        setImageError(true);
      }}
      onLoad={() => {
        console.log(`✅ Successfully loaded image: ${imagePath}`);
        setImageError(false);
      }}
    />
  );
}