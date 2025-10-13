export class Input {
  steer = 0;
  throttle = 0;
  brake = 0;
  handbrake = 0;

  private keys = new Set<string>();

  constructor() {
    window.addEventListener('keydown', (e) =>
      this.keys.add(e.key.toLowerCase())
    );
    window.addEventListener('keyup', (e) =>
      this.keys.delete(e.key.toLowerCase())
    );
  }

  update() {
    const left = this.keys.has('arrowleft') || this.keys.has('a');
    const right = this.keys.has('arrowright') || this.keys.has('d');
    const up = this.keys.has('arrowup') || this.keys.has('w');
    const down = this.keys.has('arrowdown') || this.keys.has('s');
    this.steer = (right ? 1 : 0) - (left ? 1 : 0);
    this.throttle = up ? 1 : 0;
    this.brake = down ? 1 : 0;
    this.handbrake = this.keys.has(' ');
  }
}
