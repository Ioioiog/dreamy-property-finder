import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface ThreeViewerProps {
  propertyId: string;
  onClose: () => void;
}

const ROOM_TYPES = ['living', 'kitchen', 'bedroom', 'bathroom', 'balcony'];

export default function ThreeViewer({ propertyId, onClose }: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('living');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    console.log('🎥 Initializing Three.js viewer for property:', propertyId);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Controls setup optimized for mobile
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Limit vertical rotation to prevent distortion
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;
    
    // Limit horizontal rotation
    controls.minAzimuthAngle = -Math.PI * 0.67;
    controls.maxAzimuthAngle = Math.PI * 0.67;

    // Initial camera position
    camera.position.z = 0.1;

    // Create cylinder geometry
    const geometry = new THREE.CylinderGeometry(50, 50, 50, 60, 1, true);
    geometry.scale(-1, 1, 1);
    
    const loadRoom = (roomType: string) => {
      setIsLoading(true);
      setError(null);
      
      const imagePath = `/assets/360/${propertyId}/${roomType}.jpg`;
      console.log('🖼️ Loading panorama:', imagePath);
      
      const loader = new THREE.TextureLoader();
      loader.load(
        imagePath,
        (texture) => {
          // Clear existing meshes
          scene.clear();
          
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.repeat.x = -1;
          
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const cylinder = new THREE.Mesh(geometry, material);
          scene.add(cylinder);
          
          setIsLoading(false);
          console.log('✅ Panorama loaded successfully');
          
          camera.position.set(0, 0, 0.1);
          controls.update();
        },
        undefined,
        (error) => {
          console.error('❌ Error loading panorama:', error);
          setError(`Failed to load ${roomType} view`);
          setIsLoading(false);
        }
      );
    };

    // Load initial room
    loadRoom(currentRoom);

    // Animation loop with damping
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [propertyId, currentRoom]);

  const handleRoomChange = (room: string) => {
    console.log('🔄 Changing room to:', room);
    setCurrentRoom(room);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div ref={containerRef} className="w-full h-full" />
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-white text-xl">Loading panorama...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm">
        {ROOM_TYPES.map((room) => (
          <Button
            key={room}
            variant="ghost"
            className={cn(
              "text-white hover:text-white hover:bg-white/20",
              currentRoom === room && "bg-white/20"
            )}
            onClick={() => handleRoomChange(room)}
          >
            {room.charAt(0).toUpperCase() + room.slice(1)}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="text-white hover:text-white hover:bg-white/20"
          onClick={() => setShowInfo(!showInfo)}
        >
          Info
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      {showInfo && (
        <Card className="absolute top-8 right-8 w-80 p-4 bg-white/90 backdrop-blur-sm animate-in fade-in slide-in-from-right">
          <h2 className="text-xl font-semibold mb-4">Room Details</h2>
          <div className="space-y-2">
            <p>Currently viewing: {currentRoom.charAt(0).toUpperCase() + currentRoom.slice(1)}</p>
            <p>Use mouse or touch to look around</p>
            <p>Scroll or pinch to zoom</p>
          </div>
        </Card>
      )}
    </div>
  );
}