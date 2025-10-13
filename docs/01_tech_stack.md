### Language & Build

- **TypeScript** (strict) + **Vite** for fast HMR and production bundling.

### Rendering Engine

- **Babylon.js** with **WebGPU where available**, auto‑fallback to WebGL2.

  - Reasons: mature PBR + GLTF2 pipeline, KTX2/Draco, physics integration points, solid docs.
  - Alternatives (documented but not chosen): Three.js, PlayCanvas, Godot WASM, Unity WebGL.

### Physics

- **Rapier WASM** (Rust → WASM) for rigid bodies, ray casts, and constraints.

  - Custom vehicle dynamics layer on top: sprung mass model, Pacejka‑lite curves, drivetrain.
  - Optionally compare with Ammo.js later for benchmarking.

### Networking (post-MVP)

- WebSocket room server via **Colyseus** (Node.js), with authoritative tick + client prediction.
- NAT traversal later via WebRTC for P2P experiments; prefer server-authoritative first.

### Assets

- **GLTF 2.0** + **Draco** mesh compression + **KTX2** BasisU textures; HDRI (RGBD) sky.

### Tooling

- ESLint + Prettier, Vitest + Playwright for tests, GitHub Actions CI, Sentry (runtime), Web Vitals.
