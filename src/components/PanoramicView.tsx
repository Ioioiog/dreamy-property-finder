import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { propertyData } from '@/data/properties';
import { PanoramicScene } from './panoramic/PanoramicScene';
import { PanoramicControls } from './panoramic/PanoramicControls';
import { toast } from './ui/use-toast';

export default function PanoramicView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData.find(p => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: PanoramicScene;
    controls?: PanoramicControls;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current || !property) {
      console.error('Container or property not found:', { container: !!containerRef.current, propertyId: id });
      return;
    }

    console.log('Initializing panoramic view for property:', property.id);
    const container = containerRef.current;
    
    // Setup scene
    const panoramicScene = new PanoramicScene(container);
    const controls = new PanoramicControls(container, panoramicScene);
    
    sceneRef.current.scene = panoramicScene;
    sceneRef.current.controls = controls;

    // Load panorama using the correct path
    const panoramicPath = `/assets/images/properties/${property.id}/panoramic.jpg`;
    console.log('Loading panoramic image from:', panoramicPath);

    // Test image loading
    const img = new Image();
    img.onload = () => {
      console.log('Panoramic image loaded successfully:', panoramicPath);
      panoramicScene.loadPanorama(panoramicPath)
        .then(() => {
          console.log('Panorama initialized successfully');
          toast({
            title: "Panoramă încărcată",
            description: "Imaginea panoramică a fost încărcată cu succes.",
          });
        })
        .catch(error => {
          console.error('Failed to initialize panorama:', error);
          toast({
            title: "Eroare",
            description: "Nu am putut încărca imaginea panoramică. Vă rugăm încercați din nou.",
            variant: "destructive",
          });
        });
    };
    
    img.onerror = () => {
      console.error('Failed to load panoramic image:', panoramicPath);
      toast({
        title: "Eroare",
        description: "Nu am putut găsi imaginea panoramică pentru această proprietate.",
        variant: "destructive",
      });
    };
    
    img.src = panoramicPath;

    // Handle window resize
    const onWindowResize = () => {
      if (!containerRef.current) return;
      panoramicScene.updateSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    function animate() {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;

      controls.update();
      panoramicScene.render();
    }
    animate();

    // Cleanup
    return () => {
      console.log('Cleaning up panoramic view');
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      controls.removeEventListeners();
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(panoramicScene.renderer.domElement);
      panoramicScene.dispose();
    };
  }, [property, id]);

  if (!property || !property.panoramicUrl) {
    console.error('Property or panoramic URL not found:', { propertyId: id, hasPanoramicUrl: !!property?.panoramicUrl });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Imagine panoramică indisponibilă</h1>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2" />
            Înapoi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white shadow-sm p-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2" />
          Înapoi
        </Button>
        <h1 className="text-2xl font-bold">{property.title} - Vedere Panoramică</h1>
      </div>
      <div 
        ref={containerRef} 
        className="flex-1 bg-gray-100"
        style={{ 
          height: 'calc(100vh - 120px)',
          touchAction: 'none'
        }}
      />
    </div>
  );
}