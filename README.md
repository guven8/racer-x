# 🏎️ Racer-X

**Open-world driving simulator** built with [Babylon.js](https://www.babylonjs.com/), [Rapier WASM](https://rapier.rs/), and [TypeScript](https://www.typescriptlang.org/).  
Designed for realism, moddability, and AI-assisted development.

> “A Sunday drive with physics good enough to race on.”

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone git@github.com:guven8/racer-x.git
cd racer-x

# Install dependencies
pnpm install

# Run the dev server
pnpm dev
# open http://localhost:5173
```

The placeholder scene will spawn a simple drivable box on a flat test road.
Use WASD / Arrow keys to drive and Space for handbrake.

⸻

🧩 Tech Stack
• Engine: Babylon.js (WebGPU → WebGL2 fallback)
• Physics: Rapier 3D (Rust → WASM)
• Language: TypeScript
• Bundler: Vite
• Structure: Modular ECS-style runtime
• Assets: GLTF + KTX2 + Draco (via assetify CLI)
• Open-World Streaming: Cell-based loader (in progress)

⸻

## 📘 Documentation

See the full docs hub at **[/docs](./docs/README.md)**.

⸻

🧱 Project Structure

src/
engine/ # loop, scene, rendering
physics/ # Rapier init + stepping
vehicle/ # car placeholder logic
io/ # keyboard/gamepad input
world/ # cell streaming stub
scripts/ # utility scripts
public/ # static files (rapier.wasm)

⸻

🧠 LLM Collaboration

The design files are structured so that Large Language Models (LLMs)
can assist with coding, physics tuning, or AI path generation.

See 13_llm_prompt_guides.md for ready-made prompt templates.

⸻

🪞 Roadmap (M1–M3) 1. M1 — Freeroam Prototype:
Car controller, traffic v0, activities (speed trap, drift, time section). 2. M2 — Polish:
Weather presets, replays, photo mode, leaderboards. 3. M3 — Online Freeroam:
4–8 player convoys, synced traffic, temporary races.

Full details: 09_tasks_milestones.md

⸻

🧾 License
• Code: MIT License
• Assets: CC-BY-SA 4.0

© 2025 Guven and Contributors

⸻

<p align="center">
  <sub>Built with ❤️ on Linux • TypeScript • Babylon.js • Rapier WASM</sub><br/>
  <sup>“The road is the feature.”</sup>
</p>
```
