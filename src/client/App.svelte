<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from './generateid';
  import { gun, onLogin } from './mjs';

  import EditorMainComponent from './component/editor/EditorMainComponent.svelte';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

  import LoginComponent from "./component/access/LoginComponent.svelte";

  let idcomponent = "main-" + generateId();
  let elcontent;

  let username;
  let sceneobjects = [];
  let blogin = false;

  const unsubLogin = onLogin.subscribe(value => {
		console.log(value);
		blogin = value;
	});

  function handle_auto_resize(event){
    if(elcontent == null){
      return;
    }
    //console.log("resize");
    let parent = elcontent.parentNode;
    elcontent.style.height = parent.clientHeight + 'px';
    elcontent.style.width = parent.clientWidth + 'px';
  }

  onMount(() => {
    elcontent = document.getElementById(idcomponent);
    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);
    window.dispatchEvent(new Event('resize'));
  });

  onDestroy(()=>{
    window.removeEventListener('resize', handle_auto_resize);
    unsubLogin();
  });
  
  function btnLogin(){
    gun.user().auth("test","test",function(ack){
      console.log(ack);
      blogin = true;
	  });
  }
	
</script>
<style>
  .mainbody{
    width:100%;
    height:100%;
  }
</style>

<div id="{idcomponent}" class="mainbody">
  {#if blogin}
    <EditorMainComponent></EditorMainComponent>
  {:else}
    <!--
    <button on:click={btnLogin}> Login </button>
    -->
    <LoginComponent></LoginComponent>
  {/if}
</div>

<NotificationDisplay></NotificationDisplay>
