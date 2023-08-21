import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { CanvasUI } from '../../libs/CanvasUI.js';

class App {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private geometry: THREE.BufferGeometry;
  private meshes: THREE.Mesh[];
  private canvasUI: CanvasUI

  constructor() {


    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    this.scene = new THREE.Scene();

    this.scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1).normalize();
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('app') as HTMLCanvasElement,
      antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 3.5, 0);
    this.controls.update();


    this.geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    this.meshes = [];

    this.setupXR();


    window.addEventListener('resize', this.resize.bind(this));
  }

  private setupXR() {
    this.renderer.xr.enabled = true;

    const self = this;
    let controller: THREE.Group;

    function onSelect() {
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() });
      const mesh = new THREE.Mesh(self.geometry, material);
      mesh.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
      mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
      self.scene.add(mesh);
      self.meshes.push(mesh);
    }

    document.body.appendChild(ARButton.createButton(this.renderer))

    controller = this.renderer.xr.getController(0) as THREE.Group;
    controller.addEventListener('select', onSelect);
    this.scene.add(controller);

    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private render() {
    this.meshes.forEach((mesh) => {
      mesh.rotateY(0.01);
    });
    this.renderer.render(this.scene, this.camera);
  }
}

export { App } 
