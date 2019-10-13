import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

import {Physics3D, Object3D} from "./threejscomponent";
//import {Physics3D, Object3D} from "./threejscomponent";

//let game = null;
//let p2 = null;

export default class BoxPhysic3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = BoxPhysic3D;
        //this.position = new ThreeVector(0, 0, 0);
        //this.materialType = 'MeshPhongMaterial';
    }
    

    basicTexture(n){
        var canvas = document.createElement( 'canvas' );
        canvas.width = canvas.height = 64;
        var ctx = canvas.getContext( '2d' );
        var colors = [];
        if(n===0){ // sphere
            colors[0] = "#58AA80";
            colors[1] = "#58FFAA";
        }
        if(n===1){ // sphere sleep
            colors[0] = "#383838";
            colors[1] = "#38AA80";
        }
        if(n===2){ // box
            colors[0] = "#AA8058";
            colors[1] = "#FFAA58";
        }
        if(n===3){ // box sleep
            colors[0] = "#383838";
            colors[1] = "#AA8038";
        }
        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = colors[1];
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillRect(32, 32, 32, 32);
        var tx = new THREE.Texture(canvas);
        tx.needsUpdate = true;
        return tx;
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        let world;
        //let camera;
        //console.log("Add Cube");
        let game = this.gameEngine;
        

        console.log(this.position)
        //console.log(game);
        //console.log(game.renderer);
        this.Object3D =null;
        var entity = game.entityworld.createEntity();

        if(game.renderer !=null){
            //THREE = game.renderer.THREE;
            scene = game.renderer.scene;
            //camera = game.renderer.camera;
            var materialType = 'MeshPhongMaterial';

            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var matBox = new THREE[materialType]( {  map: this.basicTexture(2), name:'box' } );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            //var cube = new THREE.Mesh( geometry, material );
            var cube = new THREE.Mesh( geometry, matBox );
            //console.log(this.position);
            cube.position.set(this.position.x,this.position.y,this.position.z);
            cube.scale.set( 32, 32, 32 );
            this.Object3D = cube;
            scene.add( cube );
            entity.addComponent(Object3D,{object: cube});
            //Camera
            //camera.position.z = 200;
            //camera.position.y = 100;
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

        let w = 32;
        let h = 32;
        let d = 32;
        //console.log(this.position);

        this.physicsObj = world.add({type:'box', size:[w,h,d], pos:[x,y,z], move:true, config:config, name:'box'})
        entity.addComponent(Physics3D,{object: this.physicsObj});

        //console.log(this.physicsObj);
        //if(this.Object3D !=null){
            //this.Object3D.position.set(this.physicsObj.position.x,this.physicsObj.position.y,this.physicsObj.position.x);
        //}
        //console.log(game.physicsEngine.OIMO);
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
        console.log("syncTo");
    }

    toString() {
        return `BoxPhysic3D::${super.toString()} Level${this.level}`;
    }

}