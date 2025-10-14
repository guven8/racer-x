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
  steerActivationSpeed = 0.4; // m/s before steering takes effect
  steerSaturationSpeed = 3; // m/s where steering torque reaches full strength
  reverseForceScale = 0.55; // reverse gets less drive than forward
  maxReverseSpeed = 12; // m/s (~43 kph)
  reverseEngageSpeed = 0.5; // m/s threshold before we switch to reverse

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
    const forwardSpeed = vel.x * forward.x + vel.z * forward.z;
    const speedAttenuation = 1.0 / (1.0 + speed * 0.05);
    const steerAngle = this.maxSteer * input.steer;
    let steerSpeedFactor = 0;
    const absForwardSpeed = Math.abs(forwardSpeed);
    if (absForwardSpeed > this.steerActivationSpeed) {
      steerSpeedFactor =
        (absForwardSpeed - this.steerActivationSpeed) /
        (this.steerSaturationSpeed - this.steerActivationSpeed);
      steerSpeedFactor = Math.min(1, Math.max(0, steerSpeedFactor));
    }
    const yawTorque = steerAngle * 2000 * speedAttenuation * steerSpeedFactor;
    this.body.applyTorqueImpulse({ x: 0, y: yawTorque * dt, z: 0 }, true);

    // Longitudinal forces
    let driveForce = 0;

    if (input.throttle > 0) {
      driveForce += this.engineForce * input.throttle;
    }

    if (input.brake) {
      if (forwardSpeed > this.reverseEngageSpeed) {
        // Moving forward: treat brake as stopping force.
        driveForce -= this.brakeForce;
      } else if (forwardSpeed > -this.maxReverseSpeed) {
        // Near stopped or already reversing: use reduced engine force backwards.
        driveForce -= this.engineForce * this.reverseForceScale;
      }
    }

    if (forwardSpeed <= -this.maxReverseSpeed && driveForce < 0) {
      // Already at reverse speed limit; don't add more reverse thrust.
      driveForce = 0;
    }

    // aero + rolling resistance (always oppose direction of travel)
    const dragForce = -this.drag * forwardSpeed * Math.abs(forwardSpeed);
    const rrForce = -this.rr * forwardSpeed;

    const longitudinalForce = driveForce + dragForce + rrForce;

    const impulseX = forward.x * longitudinalForce * dt;
    const impulseZ = forward.z * longitudinalForce * dt;

    this.body.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true);

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
