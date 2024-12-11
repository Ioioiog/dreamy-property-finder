import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export function use360Viewer(propertyId: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    console.log('Initializing 360 viewer for property:', propertyId);
    setCurrentImageIndex(1);
    checkTotalImages();
  }, [propertyId]);

  const checkTotalImages = async () => {
    let count = 0;
    for (let i = 1; i <= 36; i++) {
      try {
        console.log(`Checking for image ${i} in property ${propertyId}`);
        const response = await fetch(`/assets/360/${propertyId}/image-${i}.jpg`);
        if (response.ok) {
          count = i;
          console.log(`Found image ${i}`);
        } else {
          console.log(`Image ${i} not found, stopping search`);
          break;
        }
      } catch (error) {
        console.error(`Error checking image ${i}:`, error);
        break;
      }
    }
    
    if (count === 0) {
      console.error('No 360° images found for property:', propertyId);
      toast({
        title: "Vedere 360° indisponibilă",
        description: "Vederea 360° pentru această proprietate nu este disponibilă momentan.",
        variant: "destructive"
      });
      return false;
    }
    
    console.log(`Total images found for property ${propertyId}:`, count);
    setTotalImages(count);
    return true;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev % totalImages) + 1;
      console.log('Moving to next image:', next);
      return next;
    });
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => {
      const previous = prev === 1 ? totalImages : prev - 1;
      console.log('Moving to previous image:', previous);
      return previous;
    });
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    console.log('Started dragging at position:', clientX);
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
    console.log('Ended dragging');
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