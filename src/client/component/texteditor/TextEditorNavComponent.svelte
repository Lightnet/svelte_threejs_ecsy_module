<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun } from '../../mjs';

  let idcomponent = "navmenu-" + generateId();
  let elcontext;
  let views = [];
  let view = "viewlayer";
  let textfiles = [];
  let textfileid;
  let guntextfiles;
  export let ideditor;

  onMount(() => {
    console.log(gun);
    LoadScriptList();
  });

  onDestroy(()=>{
		guntextfiles.off();
  });

  function LoadScriptList(){
    let user = gun.user();

    guntextfiles = gun.get(user.is.pub).get('textscript');
    guntextfiles.once().map().once(function(data,key){
      console.log("data ",data);
      console.log("key ",key);
      data.key = key;
      textfiles.push(data);
      textfiles = textfiles;
    });
  }

  function SelectTextScript(e){
    console.log("select",textfileid);

    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"scriptselect",id:textfileid} }));
  }

  function NewScript(){
    //console.log(gun);
    //console.log("RANDOM:" +  Gun.text.random(16));
    let user = gun.user();
    let genid = Gun.text.random(16);
    var data = {
      label:genid,id:genid,content:"test"
    };

    gun.get(user.is.pub).get('textscript').set(data);
    
    textfiles.push(data);
    textfiles = textfiles;
  }

  function OpenScript(){
    console.log(gun);
  }

  function DeleteScript(){
    console.log(gun);
  }

</script>

<style>
  .texteditornavmenu{
    height:22px;
    float:left;
  }
</style>

<div  id={idcomponent} class="texteditornavmenu">
  <button>View</button>
  <button>Text</button>
  <button>Templates</button>

  <select bind:value={textfileid} on:change={SelectTextScript}>
    <option selected disabled > Select Text Script </option>
    {#each textfiles as textfile}
      <option value={textfile.id}> {textfile.label} </option>
    {/each}
  </select>
  <button on:click={NewScript}>New</button>
  <button on:click={OpenScript}>Open</button>
  <button on:click={DeleteScript}>Delete</button>
</div>