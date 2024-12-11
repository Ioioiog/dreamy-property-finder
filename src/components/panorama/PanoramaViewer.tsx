import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { toast } from '@/components/ui/use-toast';

interface PanoramaViewerProps {
  imageUrl: string;
}

export default function PanoramaViewer({ imageUrl }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('Initializing panorama viewer with image:', imageUrl);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create cylinder for panorama
    const geometry = new THREE.CylinderGeometry(50, 50, 50, 60, 1, true);
    geometry.scale(-1, 1, 1);

    // Load panorama texture
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (texture) => {
        console.log('Panorama texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const cylinder = new THREE.Mesh(geometry, material);
        scene.add(cylinder);

        camera.position.set(0, 0, 0.1);
      },
      undefined,
      (error) => {
        console.error('Error loading panorama:', error);
        toast({
          title: "Error",
          description: "Failed to load panorama image",
          variant: "destructive",
        });
      }
    );

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Controls setup
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !camera) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      camera.rotation.y += deltaMove.x * 0.005;
      camera.rotation.x += deltaMove.y * 0.005;
      camera.rotation.x = Math.max(-1, Math.min(1, camera.rotation.x));

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!camera) return;
      camera.position.z += e.deltaY * 0.001;
      camera.position.z = Math.max(0.1, Math.min(2, camera.position.z));
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('wheel', handleWheel);

    // Animation loop
    const animate = () => {
      if (!scene || !camera || !renderer) return;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('wheel', handleWheel);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [imageUrl]);

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}