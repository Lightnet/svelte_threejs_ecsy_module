<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  let idcomponent = "outlinernavmenu-" + generateId();
  let elcontext;

  let displaymodes = [];
  let displaymode = "viewlayer" ;

  onMount(() => {
    displaymodes.push({label:"Scene",context:"scene"});
    displaymodes.push({label:"View Layer",context:"viewlayer"});
    displaymodes.push({label:"Sequence",context:"sequence"});
    displaymodes.push({label:"App File",context:"appfile"});
    displaymodes.push({label:"Data API",context:"dataapi"});
    displaymodes.push({label:"Orphan Data",context:"orphan"});
    displaymodes = displaymodes;
  });

  onDestroy(()=>{
		
  });

  function SelectDisplayType(e){
    //console.log(displaymode);
    //console.log("Select");
  }

</script>

<style>
  .outlinernavmenu{
    height:22px;
    float:left;
  }
</style>

<div id={idcomponent} class="outlinernavmenu">
  <select bind:value={displaymode} on:change={SelectDisplayType}>
    {#each displaymodes as item}
      {#if displaymode == item.context}
        <option value={item.context} selected="selected"> {item.label} </option>
      {:else}
        <option value={item.context}> {item.label} </option>
      {/if}
    {/each}
  </select>

  <input placeholder="object name">
  <button> Filter </button>
  <button> Add Collection </button>
</div>