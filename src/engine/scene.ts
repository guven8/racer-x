// Babylon scene setup with a chase camera
import '@babylonjs/core';
import * as BABYLON from '@babylonjs/core';

export function createScene(containerId: string) {
  const container = document.getElementById(containerId)!;
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const engine = new BABYLON.Engine(canvas, true, { antialias: true });
  const scene = new BABYLON.Scene(engine);
  scene.useRightHandedSystem = true;

  const camera = new BABYLON.FollowCamera(
    'cam',
    new BABYLON.Vector3(0, 3, -8),
    scene
  );
  camera.radius = 8;
  camera.heightOffset = 2.2;
  camera.rotationOffset = 0;
  camera.cameraAcceleration = 0.05;
  camera.maxCameraSpeed = 3;

  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return { engine, scene, camera };
}
