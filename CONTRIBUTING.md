# Contributing to Racer-X

Thanks for helping build an open-world driving game! This guide covers environment setup, code style, asset rules, and validation.

## 🚀 Setup
```bash
pnpm i
pnpm dev
```

## ✅ PR checklist
- Code compiles and runs (`pnpm dev`).
- Lint/format runs clean (TBD).
- Any new JSON assets pass validation: `pnpm validate`.
- Screenshots or short notes if perf might be affected.

## 🧭 Branch & commits
- Branches: `feat/<area>-<short>`, `fix/<area>-<short>`, `docs/<topic>`
- Commits: Conventional Commits (e.g., `feat(vehicle): add slip curve loader`)

## 🧠 Code style
- TypeScript strict mode; prefer explicit types at module boundaries.
- Units are **meters, kilograms, seconds, Newtons, radians** (kph in UI only).
- No default exports (except UI components later); prefer named exports.

## 🎨 Assets
- **Code:** MIT.
- **Assets:** CC-BY-SA 4.0. Only submit original work or properly licensed sources.
- Car/world assets live under `assets/` and must include a `source.md` with provenance.

## 🧪 Validating JSON assets
We use AJV to validate JSON against schemas in `/schemas`.

### Install (already in devDeps)
```bash
pnpm i
```

### Validate everything
```bash
pnpm validate
```

### Validate specific files
```bash
# Road graph
pnpm validate:roadgraph assets/world/roads/graph.json

# Activities
pnpm validate:activities assets/world/activities.json

# Car tuning
pnpm validate:tuning assets/cars/rx01/tuning.json
```

## 📦 Folder conventions
```
assets/
  cars/<car-id>/
    model.glb
    tuning.json
    source.md
  world/
    cells/<x>_<y>/*.glb
    roads/graph.json
    activities.json
```

## 🛡️ Legal/IP
- No trademarks or distinctive trade dress.
- Generic naming only (e.g., `RX-01`), invented brands, original meshes.
- See `/docs/08_legal_and_ip.md` for details.
