import * as THREE from 'three';
import { PanoramicScene } from './PanoramicScene';

export class PanoramicControls {
  private isUserInteracting = false;
  private onPointerDownMouseX = 0;
  private onPointerDownMouseY = 0;
  private lon = 0;
  private onPointerDownLon = 0;
  private lat = 0;
  private onPointerDownLat = 0;
  private phi = 0;
  private theta = 0;

  constructor(
    private container: HTMLDivElement,
    private panoramicScene: PanoramicScene
  ) {
    this.setupEventListeners();
  }

  private updateCamera() {
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = THREE.MathUtils.degToRad(90 - this.lat);
    this.theta = THREE.MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.panoramicScene.camera.lookAt(x, y, z);
  }

  private onPointerDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    this.isUserInteracting = true;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    this.onPointerDownMouseX = clientX;
    this.onPointerDownMouseY = clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;
  };

  private onPointerMove = (event: MouseEvent | TouchEvent) => {
    if (!this.isUserInteracting) return;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    this.lon = (this.onPointerDownMouseX - clientX) * 0.1 + this.onPointerDownLon;
    this.lat = (clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;

    this.updateCamera();
  };

  private onPointerUp = () => {
    this.isUserInteracting = false;
  };

  private onWheel = (event: WheelEvent) => {
    const fov = this.panoramicScene.camera.fov + event.deltaY * 0.05;
    this.panoramicScene.camera.fov = THREE.MathUtils.clamp(fov, 30, 90);
    this.panoramicScene.camera.updateProjectionMatrix();
  };

  setupEventListeners() {
    this.container.addEventListener('mousedown', this.onPointerDown);
    this.container.addEventListener('mousemove', this.onPointerMove);
    this.container.addEventListener('mouseup', this.onPointerUp);
    this.container.addEventListener('touchstart', this.onPointerDown);
    this.container.addEventListener('touchmove', this.onPointerMove);
    this.container.addEventListener('touchend', this.onPointerUp);
    this.container.addEventListener('wheel', this.onWheel);
  }

  removeEventListeners() {
    this.container.removeEventListener('mousedown', this.onPointerDown);
    this.container.removeEventListener('mousemove', this.onPointerMove);
    this.container.removeEventListener('mouseup', this.onPointerUp);
    this.container.removeEventListener('touchstart', this.onPointerDown);
    this.container.removeEventListener('touchmove', this.onPointerMove);
    this.container.removeEventListener('touchend', this.onPointerUp);
    this.container.removeEventListener('wheel', this.onWheel);
  }

  update() {
    if (!this.isUserInteracting && this.panoramicScene.cylinder) {
      // Auto-rotation when not interacting
      this.panoramicScene.cylinder.rotation.y += 0.001;
    }
  }
}