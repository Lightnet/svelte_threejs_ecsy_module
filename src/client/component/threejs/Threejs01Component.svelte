<script>
    import { onMount, onDestroy } from 'svelte';

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

    let ToRad = Math.PI / 180;
    let container, scene, camera, sceneOrtho, cameraOrtho, renderer, controls, stats;
    let SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

    let textureLoader;

    onMount(function(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        cameraOrtho = new THREE.OrthographicCamera( - SCREEN_WIDTH / 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, - SCREEN_HEIGHT / 2, 1, 10 );
        cameraOrtho.position.z = 10;
        sceneOrtho = new THREE.Scene();

        //camera.position.set(0,150,400);
        camera.position.z = 200;
        camera.position.y = 100;
        camera.lookAt(scene.position);
        scene.add(camera);

        //RENDERER
        renderer = new THREE.WebGLRenderer( {antialias:true} );
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        container = document.getElementById( 'viewport' );
        container.appendChild( renderer.domElement );
        renderer.autoClear = false; // To allow render overlay on top of sprited sphere

        //LIGHT
        var light = new THREE.PointLight(0xffffff);
	    light.position.set(0,250,0);
        scene.add(light);

        //CAMERA CONTROL
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.target.set(0, 0, 0);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.update();

        // background
        var buffgeoBack = new THREE.BufferGeometry();
        buffgeoBack.fromGeometry( new THREE.IcosahedronGeometry(8000,1) );
        var back = new THREE.Mesh( buffgeoBack, new THREE.MeshBasicMaterial( { map:gradTexture([[1,0.75,0.5,0.25], ['#1B1D1E','#3D4143','#72797D', '#b0babf']]), side:THREE.BackSide, depthWrite: false }  ));
        back.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(15*ToRad));
        scene.add( back );

        //CUBE
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        //console.log(this.position);
        //cube.position.set(this.position.x,this.position.y,this.position.z);
        cube.scale.set( 32, 32, 32 );
        scene.add( cube );

        texture2dtext("name",0,0,0);

        //Init Render > requestAnimationFrame 
        animate();
    });

    //----------------------------------
    //  TEXTURES
    //----------------------------------
    function gradTexture(color) {
        var c = document.createElement("canvas");
        var ct = c.getContext("2d");
        c.width = 16; c.height = 256;
        var gradient = ct.createLinearGradient(0,0,0,256);
        var i = color[0].length;
        while(i--){ gradient.addColorStop(color[0][i],color[1][i]); }
        ct.fillStyle = gradient;
        ct.fillRect(0,0,16,256);
        var texture = new THREE.Texture(c);
        texture.needsUpdate = true;
        return texture;
    }

    function animate() {
	    requestAnimationFrame( animate );
        //renderer.render( scene, camera );//default

        renderer.clear();
        renderer.render( scene, camera );
        renderer.clearDepth();
        renderer.render( sceneOrtho, cameraOrtho );
    }

    function texture2dtext(name,x,y,z){
        var geo2 = new THREE.PlaneBufferGeometry( 100, 25 );
        var mesh = new THREE.Mesh( geo2, generateLabelMaterial( name, 'rgba( 0, 150, 0, 1 )' ) );
        mesh.position.set( x, - ( y - 70 ), z );
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        scene.add( mesh );
    }

    //https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_blending_custom.html
    function generateLabelMaterial( text, bg ) {
        var canvas = document.createElement( 'canvas' );
        var ctx = canvas.getContext( '2d' );
        canvas.width = 128;
        canvas.height = 32;
        ctx.fillStyle = bg;
        ctx.fillRect( 0, 0, 128, 32 );
        ctx.fillStyle = 'white';
        ctx.font = '12pt arial bold';
        ctx.fillText( text, 8, 22 );
        var map = new THREE.CanvasTexture( canvas );
        var material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
        return material;
    }

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
