import * as BABYLON from '@babylonjs/core';
import { createScene } from './engine/scene';
import { startLoop } from './engine/loop';
import { initPhysics } from './physics/rapier';
import { Car } from './vehicle/car';
import { Input } from './io/input';
import { WorldStreamer } from './world/streamer';

async function bootstrap() {
  const { engine, scene, camera } = createScene('app');
  await initPhysics();

  // Ground (temporary road plane)
  // Imported meshes will replace this via WorldStreamer later
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 2000, height: 2000, subdivisions: 4 },
    scene
  );
  const groundMat = new BABYLON.StandardMaterial('gmat', scene);
  groundMat.diffuseColor = new BABYLON.Color3(0.1, 0.12, 0.14);
  ground.material = groundMat;
  ground.receiveShadows = true;

  // Minimal hemi + directional light
  const hemi = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemi.intensity = 0.5;
  const sun = new BABYLON.DirectionalLight(
    'sun',
    new BABYLON.Vector3(-0.7, -1.0, -0.4),
    scene
  );
  sun.intensity = 1.2;

  // Car
  const car = new Car(scene);
  camera.lockedTarget = car.mesh;

  const input = new Input();
  const streamer = new WorldStreamer();

  startLoop(engine, scene, async (dtFixed) => {
    streamer.update(dtFixed, car.position);
    car.update(dtFixed, input);
  });
}

bootstrap();
