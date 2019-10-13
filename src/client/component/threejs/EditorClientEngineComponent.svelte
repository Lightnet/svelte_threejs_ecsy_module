<script>
    import { onMount, onDestroy } from 'svelte';
    //import OIMO from '../../../common/oimo';
    //import '../../../common/oimo';
    //import {ImprovedNoise} from '../../../common/ImprovedNoise';
    import Renderer from '../../../render/ThreejsRenderer';
    import Game from '../../../common/GameEditor';
    import ClientEngine from '../../../ClientEngine';

    //import CubePhysic3D from "../../../common/CubePhysic3D";
    import BoxPhysic3D from "../../../common/BoxPhysic3D";
    import CylinderPhysic3D from "../../../common/CylinderPhysic3D";
    import SpherePhysic3D from "../../../common/SpherePhysic3D";

    import ThreeVector from "../../../serialize/ThreeVector";

    import { gun, onMapLevelID } from "../../mjs";
    
    export let ideditor;

    let mapLevelID = "";
    const unsubMapLevelID = onMapLevelID.subscribe(value => {
		//console.log(value);
		mapLevelID = value;
    });
    
    let sceneobjs = [];
    let gun_maplevel;

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
        gameEngine.ignorePhysics=true;
        //console.log(gameEngine);
        clientEngine = new ClientEngine(gameEngine, options, Renderer);
        //element id viewport > threejsrenderer.js
        clientEngine.start();
        window.addEventListener('editorevent', EditorEvents);

        gun_maplevel = gun.get(mapLevelID).get("scene");

        gun_maplevel.map().open(function(data,key){
            //console.log("data",data);
            if(data !=null){
                checkobjectexist(data);
            }
            //console.log("key",key);
        });

    });

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    onDestroy(function(){
        window.removeEventListener('editorevent', EditorEvents);
        unsubMapLevelID();
    });

    async function checkobjectexist(obj){
        let bfound = false;
        for(let idx in sceneobjs){
            //console.log(sceneobjs[idx]);
            //console.log(idx);
            if(sceneobjs[idx].uuid == obj.uuid){
                bfound = true;
                console.log(sceneobjs[idx]);
                let px = await gun_maplevel.get(obj.uuid).get('position').get('x').then();
                let py = await gun_maplevel.get(obj.uuid).get('position').get('y').then();
                let pz = await gun_maplevel.get(obj.uuid).get('position').get('z').then();

                sceneobjs[idx].Object3D.position.set(px,py,pz);
                sceneobjs[idx].physicsObj.position.set(px,py,pz);

                break;
            }
        }

        if(bfound == false)
        {
            console.log(obj.uuid);
            let px = obj.position.x;
            let py = obj.position.y;
            let pz = obj.position.z;
            //console.log(obj.position.x);
            px = await gun_maplevel.get(obj.uuid).get('position').get('x').then();
            py = await gun_maplevel.get(obj.uuid).get('position').get('y').then();
            pz = await gun_maplevel.get(obj.uuid).get('position').get('z').then();
            
            let objdata = clientEngine.gameEngine.addObjectToWorld(
                new BoxPhysic3D(gameEngine, {}, { position: new ThreeVector(px, py, pz)})
            );
            objdata.uuid = obj.uuid;
            //console.log(objdata);
            sceneobjs.push(objdata);
        }
    }

    function EditorEvents(e){
        //console.log(e);
        if(e.detail.ideditor == ideditor){
            /*
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
            */
            if(e.detail.action == "togglephysics"){
                gameEngine.ignorePhysics = !gameEngine.ignorePhysics;
            }
            if(e.detail.action == "resetphysics"){

            }
        }
    }
    /*
    function AddShapeComponent(type,params){
        let obj = {
            uuid:"",
            type:type,
            name:type,
            position:{
                x:0,
                y:0,
                z:0
            },
            rotation:{
                x:0,
                y:0,
                z:0
            },
            quaternion:{
                x:0,
                y:0,
                z:0,
                w:0
            }
        }
        if(type == "Box"){
            obj.type = "Box";
        }else if(type == "sphere"){
            obj.type = "sphere";
        }else if(type == "Cylinder"){
            obj.type = "Cylinder";
        }else{
            return null;
        }
    }
    */


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

