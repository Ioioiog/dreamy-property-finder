import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export function use360Viewer(propertyId: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const imageTypes = ['living', 'bedroom', 'bathroom', 'balcony', 'kitchen'];

  useEffect(() => {
    console.log('Initializing 360 viewer for property:', propertyId);
    setCurrentImageIndex(0);
    checkTotalImages();
  }, [propertyId]);

  const checkTotalImages = async () => {
    let count = 0;
    for (const imageType of imageTypes) {
      try {
        // Using the correct GitHub repository path structure
        const imagePath = `/assets/360/${propertyId}/${imageType}.jpg`;
        console.log(`🔍 Checking image path: ${imagePath}`);
        
        // Create an Image object to check if the image exists
        const img = new Image();
        img.src = imagePath;
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            count++;
            console.log(`✅ Found image: ${imageType}.jpg at ${imagePath}`);
            resolve(true);
          };
          img.onerror = () => {
            console.log(`❌ Image not found: ${imageType}.jpg at ${imagePath}`);
            resolve(false);
          };
        });
      } catch (error) {
        console.error(`Error checking image ${imageType}:`, error);
      }
    }
    
    console.log(`📊 Total images found for property ${propertyId}: ${count}`);
    
    if (count === 0) {
      console.error('❌ No 360° images found for property:', propertyId);
      toast({
        title: "Vedere 360° indisponibilă",
        description: "Vederea 360° pentru această proprietate nu este disponibilă momentan.",
        variant: "destructive"
      });
      return false;
    }
    
    setTotalImages(count);
    return true;
  };

  const getCurrentImageType = () => {
    return imageTypes[currentImageIndex];
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = (prev + 1) % totalImages;
      console.log('➡️ Moving to next image:', next, 'Type:', imageTypes[next]);
      return next;
    });
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => {
      const previous = prev === 0 ? totalImages - 1 : prev - 1;
      console.log('⬅️ Moving to previous image:', previous, 'Type:', imageTypes[previous]);
      return previous;
    });
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    console.log('🖱️ Started dragging at position:', clientX);
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
    console.log('🖱️ Ended dragging');
  };

  return {
    currentImageIndex,
    totalImages,
    nextImage,
    previousImage,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getCurrentImageType
  };
}