<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  import ThreejsComponent from '../threejs/Threejs01Component.svelte';
  import OutlinerMainComponent from '../outliner/OutlinerMainComponent.svelte';
  import ProportiesMainComponent from '../properties/ProportiesMainComponent.svelte';
  import PreferencesMainComponent from '../preferences/PreferencesMainComponent.svelte';

  let idcomponent = "editor-" + generateId();
  let elcontext;
  let idnav= "nav-" + generateId();
  let elnav;
  let navheight = 22;
  let idcontent= "content-" + generateId();
  let elcontent;
  let editortypes = [];

  let editortype = "viewport3D";

  function handle_auto_resize(event){
    if(elcontext == null){
      return;
    }
    //console.log("resize");
    let parent = elcontext.parentNode;
    elcontext.style.height = parent.clientHeight + 'px';
    elcontext.style.width = parent.clientWidth + 'px';

    elnav.style.height = navheight + 'px';
    elnav.style.width = parent.clientWidth + 'px';

    elcontent.style.height = (parent.clientHeight - navheight ) + 'px';
    elcontent.style.width = parent.clientWidth + 'px';
  }

  onMount(() => {
    elcontext = document.getElementById(idcomponent);
    elnav = document.getElementById(idnav);
    elcontent = document.getElementById(idcontent);
    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);

    editortypes.push({label:"Outliner",context:"outliner"})
    editortypes.push({label:"Viewport3D",context:"viewport3D"})
    editortypes.push({label:"Properties",context:"properties"})
    editortypes.push({label:"Preferences",context:"preferences"})
    editortypes = editortypes;
    //console.log(editortypes);
  });

  onDestroy(()=>{
		window.removeEventListener('resize', handle_auto_resize);
  });
  
  function SelectEditorType(e){
    console.log(editortype);
    console.log("Select");
  }
</script>

<style>

</style>

<div  id={idcomponent} >
  <div id={idnav}>
    <select bind:value={editortype} on:change={SelectEditorType}>
      {#each editortypes as item}
        <option value={item.context}> {item.label} </option>
      {/each}
    </select>
  </div>
  <div id={idcontent}>
    {#if editortype == "viewport3D"}
      <ThreejsComponent />
    {/if}
    {#if editortype == "outliner"}
      <OutlinerMainComponent />
    {/if}
    {#if editortype == "properties"}
      <ProportiesMainComponent />
    {/if}
    {#if editortype == "preferences"}
      <PreferencesMainComponent />
    {/if}
  </div>
</div>
