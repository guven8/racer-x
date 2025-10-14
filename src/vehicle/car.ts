import * as BABYLON from '@babylonjs/core';
import { physicsWorld, RAPIER, step } from '../physics/rapier';
import { Input } from '../io/input';

export class Car {
  mesh: BABYLON.Mesh;
  body: RAPIER.RigidBody;
  collider: RAPIER.Collider;

  // very rough params for a placeholder car
  mass = 1200;
  engineForce = 8000; // N
  brakeForce = 9000;
  maxSteer = 0.6; // rad
  drag = 0.35;
  rr = 12; // rolling resistance approx

  constructor(scene: BABYLON.Scene) {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      'car',
      { width: 1.8, height: 1.2, depth: 4.2 },
      scene
    );
    const mat = new BABYLON.StandardMaterial('carMat', scene);
    mat.diffuseColor = new BABYLON.Color3(0.2, 0.6, 0.9);
    this.mesh.material = mat;

    // Rapier dynamic body
    const world = physicsWorld();
    const rbDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 1.2, 0);
    this.body = world.createRigidBody(rbDesc);
    this.collider = world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.9, 0.6, 2.1),
      this.body
    );
    this.body.setLinearDamping(0.05);
    this.body.setAngularDamping(0.5);
  }

  get position() {
    const t = this.body.translation();
    return { x: t.x, y: t.y, z: t.z };
  }

  update(dt: number, input: Input) {
    input.update();

    // sync mesh to physics
    const t = this.body.translation();
    const r = this.body.rotation();
    this.mesh.position.set(t.x, t.y, t.z);
    this.mesh.rotationQuaternion = new BABYLON.Quaternion(r.x, r.y, r.z, r.w);

    // forward vector
    const q = this.body.rotation();
    const forward = new BABYLON.Vector3(0, 0, 1).rotateByQuaternionToRef(
      new BABYLON.Quaternion(q.x, q.y, q.z, q.w),
      new BABYLON.Vector3()
    );

    // steering: yaw torque proportional to steer and speed
    const vel = this.body.linvel();
    const speed = Math.hypot(vel.x, vel.z);
    const steerAngle =
      this.maxSteer * input.steer * (1.0 / (1.0 + speed * 0.05));
    const yawTorque = steerAngle * 2000;
    this.body.applyTorqueImpulse({ x: 0, y: yawTorque * dt, z: 0 }, true);

    // engine/brake forces
    const engine = this.engineForce * input.throttle;
    const brake = this.brakeForce * (input.brake ? 1 : 0);

    // aero + rolling resistance
    const dragForce = -this.drag * speed * speed;
    const rrForce = -this.rr * speed;

    const fx = forward.x * (engine + dragForce + rrForce) - forward.x * brake;
    const fz = forward.z * (engine + dragForce + rrForce) - forward.z * brake;

    this.body.applyImpulse({ x: fx * dt, y: 0, z: fz * dt }, true);

    // simple handbrake = angular damping boost
    this.body.setAngularDamping(input.handbrake ? 4.0 : 0.5);

    // Reset to origin when 'R' held
    if (input.reset) {
      this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      this.body.setTranslation({ x: 0, y: 1.2, z: 0 }, true);
      this.body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    }

    // integrate physics
    step(dt);
  }
}
