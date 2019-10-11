# svelte_threejs_ecsy_module

## Information:
 Note this work in progress.

 Build for threejs, ecsy, and svelte for modules design. Svelte V3 is to help build component system.
 ECSY ( Entity Component System framework ) will work toward building server and client in some layout of lance package. 
 
 The database will be used gunjs that work on server and client to create peer to peer.
 
 To develop game and editor in web browser. That is writen in javascript and other packages.

 Blender 3D modeling layout and logic function and script that is work toward module.

 The project is to develop game master tool to build open world editor that is module desgin and play different type game modes or rules of the world set by game master. As well let friends play with game play.

## Packages / Libs:
 * ecsy ( Entity Component System framework )
 * threejs ( javascript )
 * svelte (html / js / compiler)
 * gun (data / http / websocket)
 * gulp (auto build and compiler)
 * polka (server)
 * lance (game network)

## Setup:
 Note this is work in progress.

```
  npm install
```
 It will install the pacakges.

```
  gulp default
```
 Will build and run web server.


### File tests:

###  src\client\cliententrypoint.js
```
//import App from './App.svelte';
//import App from './component/threejs/ThreejsECSYComponent.svelte'; // sample test from ECSY 
//import App from './component/threejs/Threejs02Component.svelte'; // load model test
//import App from './component/threejs/Threejs01Component.svelte'; // sample UI
//import App from './component/threejs/ClientEngineComponent.svelte'; // physics oimo test
```

### localhost:8080
```
localhost:8080/testphysics.html
```

## Link Refs:
 * https://github.com/MozillaReality/ecsy
 * https://svelte.dev/
 * https://github.com/sveltejs/svelte
 * https://threejs.org/
 * https://github.com/mrdoob/three.js
 * https://github.com/lance-gg/lance
 * https://ecsy.io/docs/#/
 * https://github.com/lance-gg