import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export function use360Viewer(propertyId: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 Initializing 360 viewer for property:', propertyId);
    setCurrentImageIndex(1);
    checkTotalImages();
  }, [propertyId]);

  const checkTotalImages = async () => {
    setIsLoading(true);
    let foundImages = 0;
    let checking = true;
    let index = 1;

    while (checking && index <= 20) {
      try {
        const imagePath = `/assets/360/${propertyId}/image-${index}.jpg`;
        console.log(`🔍 Checking image path: ${imagePath}`);
        
        const img = new Image();
        img.src = imagePath;
        
        await new Promise((resolve) => {
          img.onload = () => {
            foundImages++;
            console.log(`✅ Found image-${index}.jpg`);
            resolve(true);
          };
          img.onerror = () => {
            checking = false;
            console.log(`❌ No more images found after image-${index-1}.jpg`);
            resolve(false);
          };
        });
        
        index++;
      } catch (error) {
        console.error(`Error checking image ${index}:`, error);
        checking = false;
      }
    }
    
    console.log(`📊 Total panorama images found: ${foundImages}`);
    
    if (foundImages === 0) {
      console.error('❌ No 360° images found for property:', propertyId);
      toast({
        title: "Vedere 360° indisponibilă",
        description: "Vederea 360° pentru această proprietate nu este disponibilă momentan.",
        variant: "destructive"
      });
    }
    
    setTotalImages(foundImages);
    setIsLoading(false);
  };

  const getCurrentImageNumber = () => `image-${currentImageIndex}`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const next = prev === totalImages ? 1 : prev + 1;
      console.log('➡️ Moving to next image:', next);
      return next;
    });
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => {
      const previous = prev === 1 ? totalImages : prev - 1;
      console.log('⬅️ Moving to previous image:', previous);
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
    getCurrentImageNumber,
    isLoading
  };
}