### Source of Truth

- Model in **Blender** → export **GLTF 2.0** (meters, Y-up via Babylon transform, right-handed handled by engine).
- Texture in 4K masters; ship 2K/1K variants via KTX2 (UASTC for hero, ETC1S for LODs).

### Car Authoring

- **Render mesh** + **collision hull** (simplified convexes). No brand logos; generic badges.
- **Pivots & empties**: wheel hubs, steering rack, suspension anchors, exhaust, lights.
- **tuning.json** format:

```json
{
  "mass": 1280,
  "inertia": [450, 1200, 1500],
  "engine": {
    "maxRPM": 7500,
    "torqueCurve": [
      [1000, 120],
      [3500, 200],
      [6500, 210]
    ]
  },
  "gears": [3.2, 2.1, 1.5, 1.2, 1.0, 0.82],
  "finalDrive": 3.9,
  "tire": { "frontWidth": 235, "rearWidth": 245, "mu": 1.1 },
  "aero": { "cd": 0.34, "clFront": 0.0, "clRear": 0.05 }
}
```

### World Authoring

- **Tiled world**: `world/cells/x_y/` folders each with visual + collision GLTFs.
- **Road graph**: `world/roads/graph.json` (nodes, edges, lanes, speed limits, splines).
- **Activity defs**: JSON per activity with gates, scoring function refs.
- Bake lightmaps for static town props; road uses unlit PBR with decals for marks.

### Import Tooling (CLI)

- `tools/assetify`: Draco + KTX2, builds HLOD meshes per cell, validates road graph continuity, emits preview heatmaps.
- `tools/assetify`: runs **Draco**, **KTX2**, creates LODs, validates pivots, emits preview.
