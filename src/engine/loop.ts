// Fixed-step accumulator loop @ 120 Hz
import * as BABYLON from '@babylonjs/core';

const FIXED_DT = 1 / 120;

export function startLoop(
  engine: BABYLON.Engine,
  scene: BABYLON.Scene,
  fixedUpdate: (dt: number) => void
) {
  let last = performance.now() / 1000;
  let acc = 0;

  engine.onBeginFrameObservable.add(() => {
    const now = performance.now() / 1000;
    let dt = Math.min(0.1, now - last);
    last = now;
    acc += dt;
    while (acc >= FIXED_DT) {
      fixedUpdate(FIXED_DT);
      acc -= FIXED_DT;
    }
  });
}
