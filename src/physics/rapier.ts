import RAPIER from '@dimforge/rapier3d-compat';

let world: RAPIER.World;

export async function initPhysics() {
  // Initialize the compat module; it mutates the imported RAPIER namespace.
  await RAPIER.init();
  world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  // Infinite ground collider at y=0
  const groundDesc = RAPIER.ColliderDesc.cuboid(1000, 0.1, 1000).setTranslation(
    0,
    -0.05,
    0
  );
  world.createCollider(groundDesc);
}

export function physicsWorld() {
  return world;
}

export function step(dt: number) {
  world.timestep = dt;
  world.step();
}

export { RAPIER };
