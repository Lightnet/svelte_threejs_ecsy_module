<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun } from '../../mjs';

  import ModalComponent from "../base/ModalComponent.svelte";
  //import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';
  import { notifier } from '@beyonk/svelte-notifications';

  export let ideditor;

  let idcomponent = "navmenu-" + generateId();
  let elcontext;
  let views = []
  let view = "viewlayer";

  //text file script
  let textfiles = []; //file scripts
  let textfileid; //key id graph
  let textfilevalue; //value graph
  let guntextfiles; //gun map
  let bedittextname = false;
  let showModal = false;

  //dialog
  let dialogmessage;

  onMount(() => {
    console.log(gun);
    let user = gun.user();
    guntextfiles = gun.get(user.is.pub).get('textscript');
    LoadScriptList();
  });

  onDestroy(()=>{
		//guntextfiles.off();
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
    for(let idx in textfiles){
      if(textfiles[idx].id == textfileid){
        textfilevalue = textfiles[idx].label;
        break;
      }
    }
    //textfilevalue = textfileid
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

    //dialogmessage ="Created javascript";
    //showModal = true;
    notifier.success('Created javascript!');
  }

  function OpenScript(){
    //console.log(gun);
  }

  function DeleteScript(){
    //console.log(gun);
    console.log(textfileid)
    if((textfileid != "Select Text Script")){
      let user = gun.user();
      gun.get(user.is.pub).get('textscript').get(textfileid).put(null);
      LoadScriptList();
      console.log("update list");
      window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"scripttextdelete",id:textfileid} }));
      notifier.success('textscript Delete!' + textfileid);
    }else{
      //dialogmessage ="textscript ID null";
      //showModal = true;
      notifier.warning('javascript ID null!');
    }
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
    if(textfileid != "Select Text Script"){
      window.dispatchEvent(new CustomEvent('editorevent',{ detail:{ideditor:ideditor, action:"runscript",id:textfileid} }));
    }else{
      //dialogmessage ="javascript ID null!";
      //showModal = true;
      notifier.warning('javascript ID null!');
    }
  }

  function ToggleSelectEdit(){
    console.log(textfileid);
    if((textfileid != "Select Text Script")){
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
      if((textfileid != "Select Text Script")){
        let user = gun.user();
        gun.get(user.is.pub).get('textscript').get(textfileid).put({label:textfilevalue});
        notifier.success('Javascript File Name Update!' + textfilevalue);
      }
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

  function someFunction () {
    notifier.success('Notifications work!');
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
      <option selected disabled>Select Text Script</option>
      {#each textfiles as textfile}
        <option value={textfile.id}> {textfile.label} </option>
      {/each}
    </select>
    <button on:click={ToggleSelectEdit}> Edit </button>
  {:else}
    <input type="text" bind:value={textfilevalue} on:keydown={EditText} pattern="^[A-Za-z0-9]"/>
    <button on:click={ToggleSelectEdit}> Select </button>
  {/if}
  <button on:click={NewScript}>New</button>
  <!--
  <button on:click={OpenScript}>Open</button>
  -->
  <button on:click={DeleteScript}>Delete</button>

  <button on:click={btnRunScript}>Run Script</button>
  <button on:click={someFunction}>Show message</button>
</div>
<!--<NotificationDisplay />-->

{#if showModal}
	<ModalComponent on:close="{() => showModal = false}">
		<h2 slot="header">
			modal
		</h2>
    {dialogmessage}
	</ModalComponent>
{/if}
