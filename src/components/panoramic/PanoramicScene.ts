import * as THREE from 'three';

export class PanoramicScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cylinder?: THREE.Mesh;

  constructor(container: HTMLDivElement) {
    // Setup scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // Position camera
    this.camera.position.set(0, 0, 0.1);
  }

  loadPanorama(imageUrl: string) {
    return new Promise<void>((resolve, reject) => {
      console.log(`[PanoramicScene] Attempting to load panorama from: ${imageUrl}`);
      
      // Create cylinder
      const geometry = new THREE.CylinderGeometry(
        100, // radius
        100, // radius
        150, // height
        32, // segments
        1, // heightSegments
        true // openEnded
      );
      geometry.scale(-1, 1, 1); // Invert the cylinder so the image is on the inside

      // Load panoramic texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.MeshBasicMaterial({ map: texture });
          this.cylinder = new THREE.Mesh(geometry, material);
          this.scene.add(this.cylinder);
          console.log(`[PanoramicScene] Panoramic texture loaded successfully from: ${imageUrl}`);
          resolve();
        },
        (progress) => {
          console.log(`[PanoramicScene] Loading progress for ${imageUrl}:`, progress);
        },
        (error) => {
          console.error(`[PanoramicScene] Error loading panoramic texture from: ${imageUrl}`, error);
          reject(error);
        }
      );
    });
  }

  updateSize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose() {
    this.renderer.dispose();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}