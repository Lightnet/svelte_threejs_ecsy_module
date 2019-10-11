<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  import ThreejsComponent from '../threejs/Threejs01Component.svelte';
  import ThreejsNavComponent from '../threejs/ThreejsNavComponent.svelte';
  import OutlinerMainComponent from '../outliner/OutlinerMainComponent.svelte';
  import OutlinerNavComponent from '../outliner/OutlinerNavComponent.svelte';
  import ProportiesMainComponent from '../properties/ProportiesMainComponent.svelte';
  import ProportiesNavComponent from '../properties/ProportiesNavComponent.svelte';
  import TextEditorMainComponent from '../texteditor/TextEditorMainComponent.svelte';
  import TextEditorNavComponent from '../texteditor/TextEditorNavComponent.svelte';
  import PreferencesMainComponent from '../preferences/PreferencesMainComponent.svelte';

  let idcomponent = "editor-" + generateId();
  let elcontext;
  let idnav= "nav-" + generateId();
  let elnav;
  let navheight = 22;
  let idcontent= "content-" + generateId();
  let elcontent;
  let editortypes = [];

  export let editortype = "viewport3D";
  //editortype = "texteditor";

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

  function checkeditortype(){
    for(let i in editortypes){
      console.log(editortypes[i]);
      if(editortypes[i].context == editortype){
        console.log("found!");
        editortype = editortype;
        break;
      }
    }
  }

  onMount(() => {
    elcontext = document.getElementById(idcomponent);
    elnav = document.getElementById(idnav);
    elcontent = document.getElementById(idcontent);
    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);

    editortypes.push({label:"Outliner",context:"outliner"})
    editortypes.push({label:"Viewport 3D",context:"viewport3D"})
    editortypes.push({label:"Properties",context:"properties"})
    editortypes.push({label:"Preferences",context:"preferences"})
    editortypes.push({label:"Text Editor",context:"texteditor"})
    editortypes = editortypes;

    //checkeditortype();
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
  .navheader{
    padding:0px 0px 0px 0px;
  }
  select{
	  padding-top: 0px;
	  padding-left: 0px;
	  padding-bottom: 0px;
	  padding-right: 0px;
    float:left;
  }
</style>

<div id={idcomponent} >
  <div id={idnav} class="navheader">
    <select bind:value={editortype} on:change={SelectEditorType}>
      {#each editortypes as item}
        {#if editortype == item.context}
          <option value={item.context} selected="selected"> {item.label} </option>
        {:else}
          <option value={item.context}> {item.label} </option>
        {/if}
      {/each}
    </select>

    {#if editortype == "viewport3D"}
      <ThreejsNavComponent ideditor={idcomponent}/>
    {/if}
    {#if editortype == "outliner"}
      <OutlinerNavComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "properties"}
      <ProportiesNavComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "texteditor"}
      <TextEditorNavComponent  ideditor={idcomponent}/>
    {/if}

  </div>
  <div id={idcontent}>
    {#if editortype == "viewport3D"}
      <ThreejsComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "outliner"}
      <OutlinerMainComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "properties"}
      <ProportiesMainComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "preferences"}
      <PreferencesMainComponent  ideditor={idcomponent}/>
    {/if}
    {#if editortype == "texteditor"}
      <TextEditorMainComponent  ideditor={idcomponent}/>
    {/if}
  </div>
</div>
