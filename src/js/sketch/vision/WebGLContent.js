import * as THREE from 'three';
import sleep from 'js-util/sleep';

import Camera from './Camera';
import Plane from './Plane';

// ==========
// Define common variables
//
let renderer;
const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock({
  autoStart: false
});

// ==========
// Define unique variables
//
const plane = new Plane();

// ==========
// Define WebGLContent Class.
//
export default class WebGLContent {
  constructor() {
  }
  start(canvas) {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0e0e0e, 1.0);

    camera.start();

    scene.add(plane);
  }
  play() {
    clock.start();
    this.update();
  }
  pause() {
    clock.stop();
  }
  update() {
    // When the clock is stopped, it stops the all rendering too.
    if (clock.running === false) return;

    // Calculate msec for this frame.
    const time = clock.getDelta();

    // Update each objects.

    // Render the 3D scene.
    renderer.render(scene, camera);
  }
  resize(resolution) {
    camera.resize(resolution);
    plane.resize(camera);
    renderer.setSize(resolution.x, resolution.y);
  }
}
