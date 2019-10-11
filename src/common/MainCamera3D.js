import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

import {Physics3D, Object3D} from "./threejscomponent";
//import {Physics3D, Object3D} from "./threejscomponent";

//let game = null;
//let p2 = null;

export default class Camera3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = Camera3D;
        //this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let camera;
        let game = this.gameEngine;
        this.Object3D =null;
        var entity = game.entityworld.createEntity();

        if(game.renderer !=null){
            camera = game.renderer.camera;
            entity.addComponent(Object3D,{object: camera});
            //Camera
            camera.position.z = 200;
            camera.position.y = 100;
            this.Object3D = camera;
        }
    }

    updateRender(){
        if(this.Object3D !=null){
            //this.Object3D.position.set(this.physicsObj.position.x,this.physicsObj.position.y,this.physicsObj.position.x);
        }
    }

    // on remove-from-world, remove the physics body
    onRemoveFromWorld() {
        //game.physicsEngine.world.removeBody(this.physicsObj);
    }

    syncTo(other) {
        super.syncTo(other);
        //console.log("syncTo");
    }

    toString() {
        return `Camera3D::${super.toString()} Level${this.level}`;
    }

}