<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

	import Folder from '../base/SceneNodeComponent.svelte';
	import { gun, onMapLevelID } from "../../mjs";

	let mapLevelID = "";
  const unsubMapLevelID = onMapLevelID.subscribe(value => {
		//console.log(value);
		mapLevelID = value;
	});
	let gun_maplevel;

  let idcomponent = "editor-" + generateId();
	let elcontext;
	let root = [];
	let sceneobjs = [];
	/*
  let root = [
		{
			type: 'folder',
			name: 'Important work stuff',
			files: [
				{ type: 'file', name: 'quarterly-results.xlsx' }
			]
		},
		{
			type: 'folder',
			name: 'Animal GIFs',
			files: [
				{
					type: 'folder',
					name: 'Dogs',
					files: [
						{ type: 'file', name: 'treadmill.gif' },
						{ type: 'file', name: 'rope-jumping.gif' }
					]
				},
				{
					type: 'folder',
					name: 'Goats',
					files: [
						{ type: 'file', name: 'parkour.gif' },
						{ type: 'file', name: 'rampage.gif' }
					]
				},
				{ type: 'file', name: 'cat-roomba.gif' },
				{ type: 'file', name: 'duck-shuffle.gif' },
				{ type: 'file', name: 'monkey-on-a-pig.gif' }
			]
		},
		{ type: 'file', name: 'TODO.md' }
	];
	*/

  function handle_auto_resize(event){
    if(elcontext == null){
      return;
    }
    //console.log("resize");
    let parent = elcontext.parentNode;
    elcontext.style.height = parent.clientHeight + 'px';
    elcontext.style.width = parent.clientWidth + 'px';
  }

  onMount(() => {
    elcontext = document.getElementById(idcomponent);
    handle_auto_resize();
		window.addEventListener('resize', handle_auto_resize);
		
		gun_maplevel = gun.get(mapLevelID).get("scene");

		gun_maplevel.map(function(data,key){
			//console.log("data",data);
			if(data !=null){
				checkobjectexist(data);
			}
			//console.log("key",key);
		});
  });

  onDestroy(()=>{
		window.removeEventListener('resize', handle_auto_resize);
		unsubMapLevelID();
	});
	
	function checkobjectexist(obj){
		let bfound = false;
		for(let idx in sceneobjs){
			console.log(sceneobjs[idx]);
			//console.log(idx);
			if(sceneobjs[idx].uuid == obj.uuid){
				bfound = true;
				break;
			}
		}

		if(bfound == false)
		{

			sceneobjs.push(obj);
			sceneobjs = sceneobjs;
		}
  }
	
</script>

<style>

</style>

<div  id={idcomponent} >
  <!--OutlinerMainComponent-->
  <Folder name="Scene" files={sceneobjs} expanded/>

</div>
