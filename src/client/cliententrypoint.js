/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 Information: Work in progres.
 */	

localStorage.clear();
//'use strict';
//import App from './App.svelte';
//import App from './component/threejs/ThreejsECSYComponent.svelte';
import App from './component/threejs/ClientEngineComponent.svelte';

//console.log(`running svelte version ${svelte.VERSION}`);

import {utils} from './mjs';
/*
import Gun from 'gun/gun';
import 'gun/lib/then';
import '../common/gunjstrustsharekeyv2';
import 'gun/sea';
*/
//require('gun/sea');

//localStorage.clear();
//window.localStorage.clear(); //try this to clear all local storage

let register_class = utils.register_class;

const app = new App({
	target: document.body,
	props: {
		name: 'MJS'
	}
});

app.$on("workspace",(event)=>{
	//console.log("workspace: " + event.detail);
})
//console.log("main app");
//export default app;