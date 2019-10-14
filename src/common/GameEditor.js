import GameEngine from "../GameEngine";
import PhysicsEngine from "../physics/OimoPhysicsEngine";

//import CubePhysic3D from "./CubePhysic3D";
import MainCamera3D from "./MainCamera3D";
import DirectionalLight3D from "./DirectionalLight3D";

import BoxPhysic3D from "./BoxPhysic3D";
import SpherePhysic3D from "./SpherePhysic3D";
import PlanePhysic3D from "./PlanePhysic3D";
import CylinderPhysic3D from "./CylinderPhysic3D";
import CapsulePhysic3D from "./CapsulePhysic3D";

import ThreeVector from "../serialize/ThreeVector";

import {World} from 'ecsy';
//import ECSY from 'ecsy';

import {Object3D, Physics3D, Rotating} from './threejscomponent';
import {MovingSystem, RotatingSystem, Physics3DSystem} from './threejssystem';

export default class Game extends GameEngine {

    constructor(options) {
        super(options);
        this.physicsEngine = new PhysicsEngine({ gameEngine: this });

        //dis/able physics client
        this.ignorePhysics=true;

        //console.log(this.physicsEngine);
        // common code
        this.on('postStep', this.gameLogic.bind(this));
        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));
        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
        //do touch above?
        //console.log("Game Engine Init...");

        this.clock = new THREE.Clock();

        this.entityworld = new World();

        this.entityworld
            .registerSystem(RotatingSystem)
            .registerSystem(MovingSystem)
            .registerSystem(Physics3DSystem);
        this.entityworld
            .registerComponent(Object3D)
            .registerComponent(Physics3D)
            .registerComponent(Rotating);
    }

    registerClasses(serializer) {
        //console.log("=========================================")
        //console.log("Register GameObject!");
        //serializer.registerClass(YourGameObject);
        serializer.registerClass(MainCamera3D);
        serializer.registerClass(DirectionalLight3D);

        serializer.registerClass(PlanePhysic3D);
        serializer.registerClass(BoxPhysic3D);
        serializer.registerClass(SpherePhysic3D);
        
        serializer.registerClass(CylinderPhysic3D);
        serializer.registerClass(CapsulePhysic3D);

        
    }

    gameLogic() {
        //console.log("logic");
    }

    step(isReenact, t, dt, physicsOnly) {
        super.step(isReenact, t, dt, physicsOnly);

        //update entity world
        var delta = this.clock.getDelta();
        var elapsedTime = this.clock.elapsedTime;
        this.entityworld.execute(delta, elapsedTime); //ECSY
    }

    //processInput(inputData, playerId) {
        //super.processInput(inputData, playerId);
    //}

    // /////////////////////////////////////////////////////////
    //
    // SERVER ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    serverSideInit() {
        // create the objects
        //this.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0, position: new ThreeVector(0, 0, 0) }));
        //this.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0 }));
    }

    serverSidePlayerJoined(ev) {

    }

    serverSidePlayerDisconnected(ev) {
        
    }


    // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    clientSideInit() {
        //get main camera for setup
        this.addObjectToWorld(new MainCamera3D(this, {}, { }));


        //testing add scene objects
        //this.addObjectToWorld(new Paddle(this, null, { playerID: 0, position: new TwoVector(PADDING, 0) }));

        //CubePhysic3D
        this.addObjectToWorld(new BoxPhysic3D(this, {}, { playerID: 0 ,position: new ThreeVector(0, 100, 0)}));
        //Ground Plane
        this.addObjectToWorld(new PlanePhysic3D(this, {}, { }));

        this.addObjectToWorld(new DirectionalLight3D(this, {}, { }));

        //this.controls = new KeyboardControls(this.renderer.clientEngine);
        //this.controls.bindKey('up', 'up', { repeat: true } );
        //this.controls.bindKey('down', 'down', { repeat: true } );
    }

    clientSideDraw() {
        //console.log("update draw?");
        //let cubePhysics = this.world.queryObjects({ instanceType: BoxPhysic3D });
        //console.log(cubePhysics);
        //https://github.com/MozillaReality/ecsy
        //comment out for ECSY better update.
        //for(let idx in cubePhysics){
            //console.log(cubePhysics[idx]);
            //cubePhysics[idx].updateRender();
        //}

        //function updateEl(el, obj) {
            //let health = obj.health>0?obj.health:15;
            //el.style.top = obj.position.y + 10 + 'px';
            //el.style.left = obj.position.x + 'px';
            //el.style.background = `#ff${health.toString(16)}f${health.toString(16)}f`;
        //}

        //let paddles = this.world.queryObjects({ instanceType: Paddle });
        //let ball = this.world.queryObject({ instanceType: Ball });
        //if (!ball || paddles.length !== 2) return;
        //updateEl(document.querySelector('.ball'), ball);
        //updateEl(document.querySelector('.paddle1'), paddles[0]);
        //updateEl(document.querySelector('.paddle2'), paddles[1]);
    }
}