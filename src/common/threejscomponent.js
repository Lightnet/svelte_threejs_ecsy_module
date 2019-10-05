import { TagComponent } from "ecsy";

export class Collidable extends TagComponent {}
export class Collider extends TagComponent {}
export class Recovering extends TagComponent {}
export class Moving extends TagComponent {}

export class Object3D {
  constructor() {
    this.object = null;
  }
  reset() {
    this.object = null;
  }
}

export class Physics3D {
  constructor() {
    this.object = null;
  }
  reset() {
    this.object = null;
  }
}

export class Colliding {
  constructor() {
    this.value = false;
  }
  reset() {
    this.value = false;
  }
}

export class Rotating {
  constructor() {
    this.enabled = true;
    this.rotatingSpeed = 0;
    this.decreasingSpeed = 0.001;
  }

  reset() {
    this.enabled = true;
    this.rotatingSpeed = 0;
    this.decreasingSpeed = 0.001;
  }
}