import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";
import {Physics3D, Object3D} from "./threejscomponent";

export default class CapsulesPhysic3D extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        this.class = CapsulesPhysic3D;
        //this.position = new ThreeVector(0, 0, 0);
        this.types = [ 'sphere', 'sphere','sphere'];
        this.sizes;
        this.positions;
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

    createcapsule(radius, height, SRadius, SHeight){
        var sRadius = SRadius || 20;
        var sHeight = SHeight || 10;
        var height = height || 22;
        var radius = radius || 10;
        var o0 = Math.PI*2;
        var o1 = Math.PI/2;
        this.sizes = [ radius,radius,radius, radius,radius,radius, radius,radius,radius ];
        this.positions = [0,0,0,   0,height*0.5,0, 0,height,0];
        var g = new THREE.Geometry();
        var m0 = new THREE.CylinderGeometry(radius, radius, height, sRadius, 1, true);
        var m1 = new THREE.SphereGeometry(radius, sRadius, sHeight, 0, o0, 0, o1);
        var m2 = new THREE.SphereGeometry(radius, sRadius, sHeight, 0, o0, o1, o1);
        var mtx0 = new THREE.Matrix4().makeTranslation(0, 0,0);
        var mtx1 = new THREE.Matrix4().makeTranslation(0, height*0.5,0);
        var mtx2 = new THREE.Matrix4().makeTranslation(0, -height*0.5,0);
        g.merge( m0, mtx0);
        g.merge( m1, mtx1);
        g.merge( m2, mtx2);
        let capsuleGeometry = new THREE.BufferGeometry();
        capsuleGeometry.fromGeometry(g);
        return capsuleGeometry;
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        let game = this.gameEngine;
        let world;
        this.Object3D =null;
        var entity = game.entityworld.createEntity();
        if(game.renderer !=null){
            var materialType = 'MeshPhongMaterial';

            scene = game.renderer.scene;
            var geometry = new THREE.CylinderBufferGeometry( 1,1,1,12,1 );
            //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var matBox = new THREE[materialType]( {  map: this.basicTexture(0), name:'sphere' } );
            //var cube = new THREE.Mesh( geometry, material );
            //var cube = new THREE.Mesh( geometry, matBox );
            
            let capsuleGeometry = this.createcapsule(1.25,2.75,4,4);

            var cube = new THREE.Mesh( capsuleGeometry, matBox );
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
        //https://github.com/lo-th/Oimo.js/blob/gh-pages/examples/test_compound2.html
        //this.physicsObj = world.add({type:'cylinder', size:[d,h,d], pos:[x,y,z], move:true, config:config, name:'cylinder'})
        this.physicsObj = world.add({
            type:this.types,
            size:this.sizes,
            pos:[x,y,z],
            posShape:this.positions,
            move:true,
            config:config,
            name:'cylinder'
        })
        entity.addComponent(Physics3D,{object: this.physicsObj});
        this.entity = entity;
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
        return `CapsulesPhysic3D::${super.toString()} Level${this.level}`;
    }
}