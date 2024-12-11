interface ViewerImageProps {
  propertyId: string;
  currentImageNumber: string;
  currentIndex: number;
  totalImages: number;
}

export default function ViewerImage({ 
  propertyId, 
  currentImageNumber, 
  currentIndex, 
  totalImages 
}: ViewerImageProps) {
  return (
    <img
      src={`/assets/360/${propertyId}/${currentImageNumber}.jpg`}
      alt={`360° view ${currentIndex} of ${totalImages}`}
      className="max-h-[70vh] max-w-[90vw] object-contain select-none"
      draggable={false}
    />
  );
}