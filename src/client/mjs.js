/*
 Project: module_ui_app_svelte

 Created by: Lightnet

 License: MIT

 */
//console.log("init ?");
import { writable, get } from 'svelte/store';
import useLocalStorage from './useLocalStorage.js';

const appid = "mjs";
var themeid = "default";
//===============================================
// Gun /SEA
export var gun = {};
export function setGun(value){
    //console.log("set?");
    gun = value;
}
export function getGun(){
    return gun;
}

export const onUserName = writable("Guest");
export const onPub = writable("");
var userData = {};

export function pair(){
    return sea;
}
export function setUser(data){
    onUserName.set(data.alias);
}
export const onLogin = writable(false);

export function onLogout(){
    onUserName.set("Guest");
    userData = {};
    sea={
        epriv:"",
        eqpub:"",
        priv:"",
        pub:"",
    }
    onPub.set("");
    onLogin.set(false);
}
//===============================================
// map level
//===============================================
//var ranid = Gun.text.random(16);
//console.log(ranid);
export const onMapLevelID = writable("wxxR9yR23DWmUuDr");

export const onSelectObj = writable("");
export const onIgnorePhysics = writable(false);//ignorePhysics

//===============================================
// access view area
//===============================================
//export const Main = writable({});
export var Main;

export const currentregion = writable('None');
export const sl_viewregion = writable('None');
export const sl_category = writable('None');
export const sl_context = writable('None');

//static varaible
export const scenes = [];
export const objects = [];
export const materials = [];
export const textures = [];
export const nodes = [];
export const data = {};
export const actions = [];
export const animations = [];
export const ops = {};
export const wins = {};
export const screens = {};
export const types = {};
export const props = {};
export const context = {};

export const view_layer = {};

data.objects = objects;
data.scenes = scenes;
data.materials = materials;
data.textures = textures;
data.nodes = nodes;
data.actions = actions;
data.animations = animations;

export const CollapseFileMenuMainHeader = writable(false);
data.CollapseFileMenuMainHeader = CollapseFileMenuMainHeader;

context.screens = screens;
context.scene = {};
context.view_layer = view_layer;
context.view_layer.objects = objects;

export const screenregion = null;//= writable(null);
context.screenregion = screenregion;

export const splitregion = null;//writable(null);
context.splitregion = splitregion;

export const contextmenu = writable({sm_context:'none',ops:{}});
context.contextmenu = contextmenu;

export const active = writable(null);
context.view_layer.objects.active = active;
context.scene = writable({});

export const updatetoggle = writable(false);

context.updatetoggle = updatetoggle;

export const utils = {}
// https://docs.blender.org/api/blender2.8/bpy.types.Operator.html
// https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
// need to check function or class
export function register_class(obj){
    //console.log(typeof(obj))
    //console.log(obj)
    if (typeof(obj) == 'function'){
        var tmp = new obj();
        //console.log(tmp)
        //console.log(tmp.name)
        if(tmp instanceof Operator){
            //ops[tmp.sm_idname] = tmp;
            ops[tmp.sm_idname] = function(args){
                if(args == null){
                    tmp.execute(context);
                }
                //this.obj = tmp;
                return tmp;
                //return this.obj;
            }
            ops[tmp.sm_idname].sm_label = tmp.sm_label;
            ops[tmp.sm_idname].sm_context = tmp.sm_context;
            ops[tmp.sm_idname].sm_options = tmp.sm_options;
            ops[tmp.sm_idname].sm_translation_context = tmp.sm_translation_context;
            //console.log("fun Operator found");
        }

        if(tmp instanceof Menu){
            //ops[tmp.sm_idname] = tmp;
            ops[tmp.sm_idname] = function(args){
                if(args == null){
                    tmp.execute(context);
                }
                //this.obj = tmp;
                return tmp;
                //return this.obj;
            }
            ops[tmp.sm_idname].sm_label = tmp.sm_label;
            ops[tmp.sm_idname].sm_context = tmp.sm_context;
            ops[tmp.sm_idname].sm_options = tmp.sm_options;
            ops[tmp.sm_idname].children = tmp.children;
            ops[tmp.sm_idname].sm_translation_context = tmp.sm_translation_context;
            //console.log("fun Operator found");
        }

    }

    if (typeof(obj) == 'object'){
        if(obj instanceof Operator){
            ops[obj.sm_idname] = obj;
            //console.log("obj Operator class")
        }
    }
    
    //if(obj instanceof Menu){
        //console.log("found Menu class")
    //}
}

utils.register_class = register_class;

function unregister_class(obj){
    console.log(typeof(obj))
}

utils.unregister_class = unregister_class;

export default {
    Main,
    data,
    types,
    props,
    ops,
    wins,
    context,
    utils,
    gun,
    setGun,
    getGun,
    onUserName,
    onPub,
    setUser,
    onLogout,
}
