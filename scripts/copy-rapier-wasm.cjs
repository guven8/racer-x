const { copyFile, mkdir } = require('fs/promises');
const path = require('path');

// Robustly locate the wasm within the package (works with pnpm)
const src = require.resolve('@dimforge/rapier3d-compat/rapier_wasm_bg.wasm');

const destDir = path.resolve(__dirname, '../public');
const dest = path.join(destDir, 'rapier.wasm');

(async () => {
  await mkdir(destDir, { recursive: true });
  await copyFile(src, dest);
  console.log('Copied Rapier WASM → public/rapier.wasm');
})();