```
packages/
  client/         ← TS game client (Babylon, Rapier WASM)
  server/         ← (M2+) Node + Colyseus authoritative server
  tools/          ← CLI: asset prep, KTX2/Draco, physics tune validators

assets/
  cars/rx01/      ← GLTF, KTX2, collision hulls, tuning.json
  tracks/willow/  ← GLTF, KTX2, nav spline, checkpoints.json

docs/             ← Design docs (this pack)
```

### Client Runtime Modules

- `core/loop.ts` — fixed-step physics (120 Hz), render (vsync), accumulator.
- `core/scene.ts` — scene setup, environment, post-processing.
- `world/streamer.ts` — **cell streaming**, terrain + road sector LODs, impostors.
- `world/roadgraph.ts` — **road network graph**, nav waypoints, speed limits, lane data.
- `io/input.ts` — keyboard/gamepad mapping, deadzones, smoothing.
- `physics/rapier.ts` — world, stepping, queries.
- `vehicle/` — suspension, tire model, drivetrain, assists.
- `traffic/` — **AI traffic agents** (graph following, spawn/despawn, behavior seeds).
- `activities/` — speed traps, drift zones, time trials, scoring.
- `ui/` — HUD, minimap, GPS line, menus, photo mode, settings.
- `audio/` — engine, tire, wind, ambience (zones), collisions.
- `net/` — (later) freeroam sync, entity interest management, traffic seeding.

### Fixed-Update Strategy

- Physics step: 1/120s. Render interpolates between states.
- Input sampled every frame; applied at next physics tick.
- Physics step: 1/120s. Render interpolates between states.
- Input sampled every frame; applied at next physics tick.
