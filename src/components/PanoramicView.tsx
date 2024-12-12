import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { propertyData } from '@/data/properties';
import { PanoramicScene } from './panoramic/PanoramicScene';
import { PanoramicControls } from './panoramic/PanoramicControls';

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
    if (!containerRef.current || !property) return;

    const container = containerRef.current;
    
    // Setup scene
    const panoramicScene = new PanoramicScene(container);
    const controls = new PanoramicControls(container, panoramicScene);
    
    sceneRef.current.scene = panoramicScene;
    sceneRef.current.controls = controls;

    // Load panorama
    panoramicScene.loadPanorama(`/assets/images/properties/${property.id}/panoramic.jpg`);

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
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      controls.removeEventListeners();
      window.removeEventListener('resize', onWindowResize);
      container.removeChild(panoramicScene.renderer.domElement);
      panoramicScene.dispose();
    };
  }, [property]);

  if (!property || !property.panoramicUrl) {
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