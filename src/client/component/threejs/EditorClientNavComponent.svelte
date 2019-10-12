<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun } from '../../mjs';
  import uuidvx from 'uuid/v1';

  export let ideditor;

  let idcomponent = "navmenu-" + generateId();
  let elcontext;

  let objectinteractionmodes = [];
  let objectinteractionmode = "object";
  let user;
  let gun_maplevel;

  onMount(() => {
    objectinteractionmodes.push({label:"Object Mode",context:"objectmode"});
    objectinteractionmodes.push({label:"Edit Mode",context:"editmode"});
    objectinteractionmodes = objectinteractionmodes;

    user = gun.user();
    if(!user.is){
      console.log("ERROR USER!");
    }
    gun.get(user.is.pub).get("map")

  });

  onDestroy(()=>{
		
  });

  function SelectObjectInteractionMode(e){
    console.log("select >> ");
    console.log(objectinteractionmode);
  }

  function btnAddBox(){
    AddShapeComponent("Box",{width:32,height:32,depth:32})
  }
  function btnAddSphere(){
    AddShapeComponent("Box",{width:32})
  }
  function btnAddCylinder(){
    AddShapeComponent("Box",{width:32,height:32,depth:32})
  }

  function AddShapeComponent(type,params){
    let objjson = {
      uuid:uuidvx(),
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
        console.log(objjson)
      }else if(type == "sphere"){
        obj.type = "sphere";
      }else if(type == "Cylinder"){
        obj.type = "Cylinder";
      }else{
        return null;
      }
    }

  //function btnAddCube(){
    //window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"addcube"} }));
  //}
  //function btnAddSphere(){
    //window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"addsphere"} }));
  //}
  //function btnAddCylinder(){
    //window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"addcylinder"} }));
  //}
  function btntogglephysics(){
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"togglephysics"} }));
  }

  function btnresetphysics(){
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"resetphysics"} }));
  }

</script>

<style>
  .threejsnavmenu{
    height:22px;
    float:left;
  }
</style>

<div id={idcomponent} class="threejsnavmenu">
  <select bind:value={objectinteractionmode} on:change={SelectObjectInteractionMode}>
    {#each objectinteractionmodes as item}
      {#if objectinteractionmode == item.context}
        <option value={item.context} selected="selected"> {item.label} </option>
      {:else}
        <option value={item.context}> {item.label} </option>
      {/if}
    {/each}
  </select>
  <!--
  <button>View</button>
  <button>Select</button>
  <button>Add</button>
  <button>Object</button>
  -->
  <button on:click={btnAddBox}>Add Box</button>
  <button on:click={btnAddSphere}>Add Sphere</button>
  <button on:click={btnAddCylinder}>Add Cylinder</button>
  

  <button on:click={btntogglephysics}>Toggle Physics</button>
  <button on:click={btnresetphysics}> Reset Physics</button>
</div>