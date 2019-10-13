<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun, onSelectObj, onMapLevelID } from '../../mjs';

  let idcomponent = "editor-" + generateId();
  let elcontext;
  let selectObj = "";

  let mapLevelID = "";
  const unsubMapLevelID = onMapLevelID.subscribe(value => {
		//console.log(value);
		mapLevelID = value;
  });
  let gun_maplevel;

  const unsubOnSelectObj = onSelectObj.subscribe(value => {
		console.log(value);
		selectObj = value;
	});

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

    /*
		gun_maplevel.map().open(function(data,key){
			//console.log("data",data);
			if(data !=null){
				checkobjectexist(data);
			}
			//console.log("key",key);
    });
    */
  });

  onDestroy(()=>{
    window.removeEventListener('resize', handle_auto_resize);
    unsubOnSelectObj();
    unsubMapLevelID();
  });
  let px = 0;
  let py = 0;
  let pz = 0;
  function onXChange(){
    console.log("xx");
    console.log(px)
    if(selectObj != ""){
      gun_maplevel.get(selectObj).get('position').get('x').put(px);
      gun_maplevel.get(selectObj).get('position').get('y').put(py);
      gun_maplevel.get(selectObj).get('position').get('z').put(pz);

      //gun_maplevel.get(selectObj).get('position').put({x:px,y:py,z:pz});
      //gun_maplevel.get(selectObj).get('position').put({x:px});
      //gun_maplevel.get(selectObj).get('position').put({x:py});
      //gun_maplevel.get(selectObj).get('position').put({x:pz});
      console.log("update?");
    }
    
  }

</script>

<style>

</style>

<div id={idcomponent}>
  Position:
  <input type="number" bind:value={px} on:keyup={onXChange}>
  <input type="number" bind:value={py} on:keyup={onXChange}>
  <input type="number" bind:value={pz} on:keyup={onXChange}>
</div>
