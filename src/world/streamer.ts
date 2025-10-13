// World cell streaming stub – replace with real cell loading later
export class WorldStreamer {
  private lastCell = '';
  update(_dt: number, pos: { x: number; y: number; z: number }) {
    const cellX = Math.floor(pos.x / 200);
    const cellZ = Math.floor(pos.z / 200);
    const id = `${cellX}:${cellZ}`;
    if (id !== this.lastCell) {
      // TODO: load GLTFs for this cell, unload far cells
      // console.log('Enter cell', id)
      this.lastCell = id;
    }
  }
}
