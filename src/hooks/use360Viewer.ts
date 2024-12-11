import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export function use360Viewer(propertyId: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(1);
    checkTotalImages();
  }, [propertyId]);

  const checkTotalImages = async () => {
    let count = 0;
    for (let i = 1; i <= 36; i++) {
      try {
        const response = await fetch(`/assets/360/${propertyId}/${i}.jpg`);
        if (response.ok) {
          count = i;
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    
    if (count === 0) {
      toast({
        title: "360° View Not Available",
        description: "The 360° view for this property is not available yet.",
        variant: "destructive"
      });
      return false;
    }
    
    setTotalImages(count);
    return true;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev % totalImages) + 1);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 1 ? totalImages : prev - 1));
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        previousImage();
      } else {
        nextImage();
      }
      setStartX(clientX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    currentImageIndex,
    totalImages,
    nextImage,
    previousImage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}