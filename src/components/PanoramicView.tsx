import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { propertyData } from '@/data/properties';
import * as THREE from 'three';

export default function PanoramicView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData.find(p => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sphere?: THREE.Mesh;
    animationId?: number;
  }>({} as any);

  useEffect(() => {
    if (!containerRef.current || !property) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create sphere
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert the sphere so the image is on the inside

    // Load panoramic texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      `/assets/images/properties/${property.id}/panoramic.jpg`,
      (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sceneRef.current.sphere = sphere;
        console.log('Panoramic texture loaded successfully');
      },
      undefined,
      (error) => {
        console.error('Error loading panoramic texture:', error);
      }
    );

    // Position camera
    camera.position.set(0, 0, 0.1);

    // Animation
    function animate() {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;

      if (sceneRef.current.sphere) {
        // Rotație automată stânga-dreapta
        sceneRef.current.sphere.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    }

    // Mouse controls
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    function onPointerDown(event: MouseEvent) {
      isUserInteracting = true;
      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    }

    function onPointerMove(event: MouseEvent) {
      if (isUserInteracting) {
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
      }
    }

    function onPointerUp() {
      isUserInteracting = false;
    }

    function onWheel(event: WheelEvent) {
      const fov = camera.fov + event.deltaY * 0.05;
      camera.fov = THREE.MathUtils.clamp(fov, 30, 90);
      camera.updateProjectionMatrix();
    }

    // Event listeners
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mouseup', onPointerUp);
    container.addEventListener('wheel', onWheel);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      container.removeChild(renderer.domElement);
      renderer.dispose();
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
        className="flex-1 bg-gray-100 relative"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      />
    </div>
  );
}