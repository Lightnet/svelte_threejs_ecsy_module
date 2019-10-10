<script>
    import { onMount, onDestroy } from 'svelte';
    //import OIMO from '../../../common/oimo';
    //import '../../../common/oimo';
    //console.log("test");
    //import {ImprovedNoise} from '../../../common/ImprovedNoise';
    import Renderer from '../../../render/ThreejsRenderer';
    import Game from '../../../common/Game02';
    import ClientEngine from '../../../ClientEngine';

    import CubePhysic3D from "../../../common/CubePhysic3D";
    import ThreeVector from "../../../serialize/ThreeVector";

    let defaults = {
        //traceLevel: Lib.Trace.TRACE_NONE,
        delayInputCount: 3,
        //scheduler: 'render-schedule',//server
        scheduler: 'fixed',//client
        syncOptions: {
            //sync: qsOptions.sync || 'extrapolate',
            remoteObjBending: 0.8,
            bendingIncrements: 6
        }
    };

    //let options = Object.assign(defaults, qsOptions);
    let options = defaults;
    let gameEngine;
    let clientEngine;

    onMount(function(){
        gameEngine = new Game(options);
        //console.log(gameEngine);
        clientEngine = new ClientEngine(gameEngine, options, Renderer);
        //element id viewport > threejsrenderer.js
        clientEngine.start();

        let camera = clientEngine.gameEngine.renderer.camera;
        camera.position.z = 200;
        camera.position.y = 100;
    });

    onDestroy(function(){

    });

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function AddCube(){
        console.log("add");
        //clientEngine.world.queryObjects({ instanceType: CubePhysic3D });
        //gameEngine.addObjectToWorld(new CubePhysic3D(this, {}, { playerID: 0 ,position: new ThreeVector(0, 200, 0)}));
        let x = getRandomArbitrary(-128, 128);
        let y = 200;
        let z = getRandomArbitrary(-128, 128);
        //x = 100;
        //z = -100;
        clientEngine.gameEngine.addObjectToWorld(
            new CubePhysic3D(gameEngine, {}, { playerID: 0 ,position: new ThreeVector(x, y, z)})
        );
        console.log(gameEngine);
    }
</script>
<style>
    .topleft{
        position:fixed;
        /*top:0;*/
        /*left:0;*/
    }
</style>

<!--<canvas id="canvas" class="topleft"></canvas>-->
<div id="viewport" class="topleft" style="width:100%;height:100%;"></div>
<div  class="topleft" >
    <button on:click={AddCube}>Add</button>
</div>
