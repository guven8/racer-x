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

  // Ground (tiled checker texture)
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 2000, height: 2000, subdivisions: 4 },
    scene
  );

  // High-contrast checker texture (8x8)
  const tex = new BABYLON.DynamicTexture(
    'grid512',
    { width: 512, height: 512 },
    scene,
    false
  );
  const ctx = tex.getContext();
  const size = 512,
    cells = 8,
    cell = size / cells;
  ctx.fillStyle = '#cccccc';
  ctx.fillRect(0, 0, size, size);
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      if ((x + y) % 2 === 0) {
        ctx.fillStyle = '#333333';
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
  tex.update();

  const groundMat = new BABYLON.StandardMaterial('gmat', scene);
  groundMat.diffuseTexture = tex;
  // Tile so one checker ~10m over a 2000m plane → 200 tiles
  const texAsTex = groundMat.diffuseTexture as BABYLON.Texture;
  texAsTex.uScale = 200;
  texAsTex.vScale = 200;
  texAsTex.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  texAsTex.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  groundMat.specularColor = new BABYLON.Color3(0, 0, 0);
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
  camera.radius = 20;
  camera.heightOffset = 6;
  camera.rotationOffset = 180;

  const input = new Input();
  const streamer = new WorldStreamer();

  startLoop(engine, scene, async (dtFixed) => {
    streamer.update(dtFixed, car.position);
    car.update(dtFixed, input);
  });
}

bootstrap();
