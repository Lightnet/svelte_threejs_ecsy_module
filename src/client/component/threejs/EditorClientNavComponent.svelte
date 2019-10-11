<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  export let ideditor;

  let idcomponent = "navmenu-" + generateId();
  let elcontext;

  let objectinteractionmodes = [];
  let objectinteractionmode = "object";

  onMount(() => {
    objectinteractionmodes.push({label:"Object Mode",context:"objectmode"});
    objectinteractionmodes.push({label:"Edit Mode",context:"editmode"});
    objectinteractionmodes = objectinteractionmodes;

  });

  onDestroy(()=>{
		
  });

  function SelectObjectInteractionMode(e){
    console.log("select >> ");
    console.log(objectinteractionmode);
  }

  function btnAddCube(){
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"addcube"} }));
  }

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
  <button>View</button>
  <button>Select</button>
  <button>Add</button>
  <button>Object</button>

  <button on:click={btnAddCube}>Test Add Box</button>
  <button on:click={btntogglephysics}>Toggle Physics</button>
  <button on:click={btnresetphysics}> Reset Physics</button>
</div>