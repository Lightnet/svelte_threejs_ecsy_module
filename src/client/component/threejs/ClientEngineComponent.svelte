<script>
    import { onMount, onDestroy } from 'svelte';
    //import OIMO from '../../../common/oimo';
    //import '../../../common/oimo';
    //console.log("test");
    //import {ImprovedNoise} from '../../../common/ImprovedNoise';
    import Renderer from '../../../render/ThreejsRenderer';
    import Game from '../../../common/Game';
    import ClientEngine from '../../../ClientEngine';

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
    });

    onDestroy(function(){

    });
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
