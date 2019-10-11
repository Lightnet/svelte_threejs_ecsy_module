/*
 Project: module_ui_app_svelte
 Created by: Lightnet
 License: MIT
 Information: Work in progres.
 */

import {setGun} from './mjs';
//import App from './App.svelte';
//import App from './component/threejs/ThreejsECSYComponent.svelte';
//import App from './component/threejs/Threejs02Component.svelte';
//import App from './component/threejs/Threejs01Component.svelte';
//import App from './component/threejs/ClientEngineComponent.svelte';
import App from './component/threejs/ClientEngine02Component.svelte';

var gun = Gun("http://localhost:8080/gun");
function UserLogin(){
	gun.user().auth("test","test",function(ack){
		console.log(ack);
	});
}
function CreateAccount(){
	gun.user().create("test","test",function(ack){
		console.log(ack);
	});
}
//CreateAccount();
//UserLogin();
setGun(gun);

const app = new App({
	target: document.body,
	props: {
		name: 'MJS'
	}
});