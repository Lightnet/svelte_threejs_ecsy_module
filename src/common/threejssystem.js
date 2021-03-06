

import { System } from "ecsy";

import { gun, onIgnorePhysics } from "../client/mjs";
//var IgnorePhysics = false;
//const unsubIgnorePhysics 

import {
  Object3D,
  Physics3D,
  //Collidable,
  //Collider,
  //Recovering,
  Moving,
  //PulsatingScale,
  //Timeout,
  //PulsatingColor,
  //Colliding,
  Rotating
} from "./threejscomponent.js";

export class Physics3DSystem extends System {
  constructor(world, attributes){
    super(world, attributes);
    this.IgnorePhysics = false;
    let self = this;
    onIgnorePhysics.subscribe(value => {
      console.log("TEST ENABLE:",value);
      self.IgnorePhysics = value;
    });

  }
  execute(delta) {
    let entities = this.queries.entities.results;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      let physics = entity.getComponent(Physics3D).object;
      let object = entity.getComponent(Object3D).object;
      //console.log('update physics');
      //console.log(physics);
      //console.log(object);
      //object.rotation.x += rotatingSpeed * delta;
      //object.rotation.y += rotatingSpeed * delta * 2;
      //object.rotation.z += rotatingSpeed * delta * 3;
      //console.log(physics);
      if(!this.IgnorePhysics){
        object.position.copy(physics.getPosition());
        object.quaternion.copy(physics.getQuaternion());
      }
    }
  }
}
Physics3DSystem.queries = {
  entities: { components: [Physics3D, Object3D] }
};

export class RotatingSystem extends System {
  execute(delta) {
    let entities = this.queries.entities.results;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      let rotatingSpeed = entity.getComponent(Rotating).rotatingSpeed;
      let object = entity.getComponent(Object3D).object;

      object.rotation.x += rotatingSpeed * delta;
      object.rotation.y += rotatingSpeed * delta * 2;
      object.rotation.z += rotatingSpeed * delta * 3;
    }
  }
}

RotatingSystem.queries = {
  entities: { components: [Rotating, Object3D] }
};

export class MovingSystem extends System {
  execute(delta, time) {
    let entities = this.queries.entities.results;
    for (let i = 0; i < entities.length; i++) {
      let entity = entities[i];
      let object = entity.getComponent(Object3D).object;
      let offset = entity.getComponent(Moving).offset;
      let radius = 5;
      let maxRadius = 5;
      object.position.z = Math.cos(time + 3 * offset) * maxRadius + radius;
    }
  }
}

MovingSystem.queries = {
  entities: { components: [Moving] }
};