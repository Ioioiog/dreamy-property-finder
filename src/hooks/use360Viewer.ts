import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export function use360Viewer(propertyId: string) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
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

    while (checking && index <= 36) { // Check up to 36 images (10° intervals)
      const imagePath = `/assets/360/${propertyId}/image-${index}.jpg`;
      console.log(`🔍 Checking image: ${imagePath}`);
      
      try {
        const response = await fetch(imagePath);
        if (response.ok) {
          foundImages++;
          console.log(`✅ Found image ${index}`);
          index++;
        } else {
          checking = false;
          console.log(`❌ No more images found after ${index-1}`);
        }
      } catch (error) {
        console.error(`Error checking image ${index}:`, error);
        checking = false;
      }
    }
    
    console.log(`📊 Total images found: ${foundImages}`);
    
    if (foundImages === 0) {
      console.error('❌ No 360° images found for property:', propertyId);
      toast({
        title: "360° View Unavailable",
        description: "The 360° view for this property is not available at the moment.",
        variant: "destructive"
      });
    }
    
    setTotalImages(foundImages);
    setIsLoading(false);
  };

  const getCurrentImageNumber = () => currentImageIndex;

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
    const threshold = 30; // Reduced threshold for more responsive rotation

    if (Math.abs(deltaX) > threshold) {
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