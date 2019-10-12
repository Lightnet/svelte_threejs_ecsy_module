import PhysicalObject3D from "../serialize/PhysicalObject3D";
import ThreeVector from "../serialize/ThreeVector";

//let game = null;
//let p2 = null;

export default class DirectionalLight extends PhysicalObject3D{

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);

        this.class = DirectionalLight;
        //this.position = new ThreeVector(0, 0, 0);
    }

    // on add-to-world, create a physics body
    onAddToWorld() {
        let scene;
        let game = this.gameEngine;
        if(game.renderer !=null){
            //THREE = game.renderer.THREE;
            scene = game.renderer.scene;
            //camera = game.renderer.camera;

            let light = new THREE.DirectionalLight( 0xffffff , 1);
            light.position.set( 300, 1000, 500 );
            light.target.position.set( 0, 0, 0 );
            light.castShadow = true;
            var d = 300;
            light.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 );
            light.shadow.bias = 0.0001;
            light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
            scene.add( light )
            this.light = light;
            
            //scene.add(terrain);
        }
    }

    // on remove-from-world, remove the physics body
    onRemoveFromWorld() {
        //game.physicsEngine.world.removeBody(this.physicsObj);
    }

    syncTo(other) {
        super.syncTo(other);
    }

    toString() {
        return `PlanePhysic3D::${super.toString()} Level${this.level}`;
    }
}