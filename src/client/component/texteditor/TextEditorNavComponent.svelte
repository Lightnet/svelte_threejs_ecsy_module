<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun } from '../../mjs';

  let idcomponent = "navmenu-" + generateId();
  let elcontext;
  let views = []
  let view = "viewlayer";
  let textfiles = [];
  let textfileid;
  let guntextfiles;
  let bedittextname = false;
  export let ideditor;

  onMount(() => {
    console.log(gun);
    let user = gun.user();
    guntextfiles = gun.get(user.is.pub).get('textscript');
    LoadScriptList();
  });

  onDestroy(()=>{
		guntextfiles.off();
  });

  function LoadScriptList(){
    let user = gun.user();
    textfiles = [];
    //guntextfiles = gun.get(user.is.pub).get('textscript');
    guntextfiles.once().map().once(function(data,key){
      //console.log("data ",data);
      //console.log("key ",key);
      if(data == null){
        console.log("NULL")
        return;
      }
      if(data !=null){
        //data.key = key;
        console.log("data ",data);
        if(data.id != null){
          textfiles.push(data);
          textfiles = textfiles;
        }else{
          //if id key is null then null key graph
          gun.get(user.is.pub).get('textscript').get(key).put(null);
        }
      }else{
        console.log("other")
      }
    });
  }

  function SelectTextScript(e){
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"scriptselect",id:textfileid} }));
  }

  function NewScript(){
    //console.log(gun);
    //console.log("RANDOM:" +  Gun.text.random(16));
    let user = gun.user();
    let genid = Gun.text.random(16);
    var data = {
      label:genid,id:genid,content:`console.log("Hello World! Generate Hash: ${genid}");`
    };
    gun.get(user.is.pub).get('textscript').get(genid).put(data);
    textfiles.push(data);
    textfiles = textfiles;
  }

  function OpenScript(){
    //console.log(gun);
  }

  function DeleteScript(){
    //console.log(gun);
    console.log(textfileid)
    let user = gun.user();
    gun.get(user.is.pub).get('textscript').get(textfileid).put(null);
    LoadScriptList();
    console.log("update list");
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"scripttextdelete",id:textfileid} }));
  }

  function btnRunScript(){
    console.log("run");
    //var win = window.open(
      //'http://localhost:8080/debugscripteditor.html',
      //'_blank' // <- This is what makes it open in a new window.
      //'test'
    //);
    //console.log(win);
    //win.document.write("Hello World!");
    window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"runscript",id:textfileid} }));
  }

  function ToggleSelectEdit(){
    if(textfileid != null){
      bedittextname = !bedittextname;
    }
  }

  //let regex = new RegExp("^[a-zA-Z0-9 ]");
  let regex = new RegExp("[A-Za-z0-9]");

  function EditText(e){
    console.log(e);
    //console.log(e.charCode);5
    if(e.key == "Enter"){
      bedittextname=false;


    }
    //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    var str = e.key;
    console.log(str);
    console.log(regex.test(str))
    //if (regex.test(str)) return true;
    //console.log("OK");
    //e.preventDefault();
    //return false;
    
  }
</script>

<style>
  .texteditornavmenu{
    height:22px;
    float:left;
  }
</style>

<div id={idcomponent} class="texteditornavmenu">
  <!--
  <button>View</button>
  <button>Text</button>
  <button>Templates</button>
  -->
  {#if bedittextname == false}
    <select bind:value={textfileid} on:change={SelectTextScript} style="width:150px;">
      <option selected disabled > Select Text Script </option>
      {#each textfiles as textfile}
        <option value={textfile.id}> {textfile.label} </option>
      {/each}
    </select>
    <button on:click={ToggleSelectEdit}> Edit </button>
  {:else}
    <input type="text" bind:value={textfileid} on:keydown={EditText} pattern="^[A-Za-z0-9]"/>
    <button on:click={ToggleSelectEdit}> Select </button>
  {/if}
  <button on:click={NewScript}>New</button>
  <button on:click={OpenScript}>Open</button>
  <button on:click={DeleteScript}>Delete</button>

  <button on:click={btnRunScript}>Run Script</button>
</div>