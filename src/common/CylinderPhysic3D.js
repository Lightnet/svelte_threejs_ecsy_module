import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

import {Physics3D, Object3D} from "./threejscomponent";
//import {Physics3D, Object3D} from "./threejscomponent";

//let game = null;
//let p2 = null;

export default class Cylinder3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = Cylinder3D;
        //this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        let game = this.gameEngine;
        let world;
        this.Object3D =null;
        var entity = game.entityworld.createEntity();
        if(game.renderer !=null){
            scene = game.renderer.scene;
            var geometry = new THREE.CylinderBufferGeometry( 1,1,1,12,1 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            //console.log(this.position);
            cube.position.set(this.position.x,this.position.y,this.position.z);
            cube.scale.set( 32, 32, 32 );
            this.Object3D = cube;
            scene.add( cube );
            entity.addComponent(Object3D,{object: cube});

        }
        var all = 0xffffffff;
        var config = [
            1, // The density of the shape.
            0.4, // The coefficient of friction of the shape.
            0.2, // The coefficient of restitution of the shape.
            1, // The bits of the collision groups to which the shape belongs.
            all // The bits of the collision groups with which the shape collides.
        ];
        world = game.physicsEngine.world;
        let x = this.position.x;
        let y = this.position.y;
        let z = this.position.z;
        let d = 32;
        let h = 32;
        this.physicsObj = world.add({type:'cylinder', size:[d,h,d], pos:[x,y,z], move:true, config:config, name:'cylinder'})
        entity.addComponent(Physics3D,{object: this.physicsObj});
    }

    updateRender(){
        //if(this.Object3D !=null){
            //this.Object3D.position.set(this.physicsObj.position.x,this.physicsObj.position.y,this.physicsObj.position.x);
        //}
    }

    // on remove-from-world, remove the physics body
    onRemoveFromWorld() {
        //game.physicsEngine.world.removeBody(this.physicsObj);
    }
    syncTo(other) {
        super.syncTo(other);
        console.log("syncTo");
    }
    toString() {
        return `SpherePhysic3D::${super.toString()} Level${this.level}`;
    }
}