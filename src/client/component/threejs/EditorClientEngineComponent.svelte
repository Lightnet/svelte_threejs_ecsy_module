<script>
    import { onMount, onDestroy } from 'svelte';
    //import OIMO from '../../../common/oimo';
    //import '../../../common/oimo';
    //console.log("test");
    //import {ImprovedNoise} from '../../../common/ImprovedNoise';
    import Renderer from '../../../render/ThreejsRenderer';
    import Game from '../../../common/GameEditor';
    import ClientEngine from '../../../ClientEngine';

    //import CubePhysic3D from "../../../common/CubePhysic3D";
    import BoxPhysic3D from "../../../common/BoxPhysic3D";
    import CylinderPhysic3D from "../../../common/CylinderPhysic3D";
    import SpherePhysic3D from "../../../common/SpherePhysic3D";

    import ThreeVector from "../../../serialize/ThreeVector";

    export let ideditor;

    let defaults = {
        //traceLevel: Lib.Trace.TRACE_NONE,
        delayInputCount: 3,
        scheduler: 'render-schedule',//server
        //scheduler: 'fixed',//client
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
        gameEngine.ignorePhysics=false;
        //console.log(gameEngine);
        clientEngine = new ClientEngine(gameEngine, options, Renderer);
        //element id viewport > threejsrenderer.js
        clientEngine.start();
        window.addEventListener('editorevent', EditorEvents);
    });

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    onDestroy(function(){
        window.removeEventListener('editorevent', EditorEvents);
    });

    function EditorEvents(e){
        console.log(e);
        if(e.detail.ideditor == ideditor){
            if(e.detail.action == "addcube"){
                let x = getRandomArbitrary(-128, 128);
                let y = 200;
                let z = getRandomArbitrary(-128, 128);
                clientEngine.gameEngine.addObjectToWorld(
                    new BoxPhysic3D(gameEngine, {}, { playerID: 0 ,position: new ThreeVector(x, y, z)})
                );
            }

            if(e.detail.action == "addsphere"){
                let x = getRandomArbitrary(-128, 128);
                let y = 200;
                let z = getRandomArbitrary(-128, 128);
                clientEngine.gameEngine.addObjectToWorld(
                    new SpherePhysic3D(gameEngine, {}, { playerID: 0 ,position: new ThreeVector(x, y, z)})
                );
            }

            if(e.detail.action == "addcylinder"){
                let x = getRandomArbitrary(-128, 128);
                let y = 200;
                let z = getRandomArbitrary(-128, 128);
                clientEngine.gameEngine.addObjectToWorld(
                    new CylinderPhysic3D(gameEngine, {}, { playerID: 0 ,position: new ThreeVector(x, y, z)})
                );
            }

            if(e.detail.action == "togglephysics"){
                gameEngine.ignorePhysics = !gameEngine.ignorePhysics;
            }
            if(e.detail.action == "resetphysics"){

            }
        }
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
