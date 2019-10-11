<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from './generateid';
  import { gun, onLogin } from './mjs';

  import EditorMainComponent from './component/editor/EditorMainComponent.svelte';
  import { NotificationDisplay, notifier } from '@beyonk/svelte-notifications';

  import LoginComponent from "./component/access/LoginComponent.svelte";
  import DisplayUserComponent from "./component/access/DisplayUserComponent.svelte";

  import LayoutLayoutComponent from "./component/layout/LayoutLayoutComponent.svelte";


  let idcomponent = "main-" + generateId();
  let elcomponent;
  let idnav = "nav-" + generateId();
  let elnav;
  let idcontent = "content-" + generateId();
  let elcontent;
  let navheight = 22;

  let username;
  let sceneobjects = [];
  let blogin = false;

  const unsubLogin = onLogin.subscribe(value => {
		//console.log(value);
		blogin = value;
	});

  function handle_auto_resize(event){
    //if(elcomponent == null){
      //return;
    //}
    //console.log("resize");
    let parent = elcomponent.parentNode;
    elcomponent.style.height = parent.clientHeight + 'px';
    elcomponent.style.width = parent.clientWidth + 'px';

    elnav.style.height = navheight + 'px';
    elnav.style.width = parent.clientWidth + 'px';

    elcontent.style.height = (parent.clientHeight - navheight) + 'px';
    elcontent.style.width = parent.clientWidth + 'px';
  }

  onMount(() => {
    elcomponent = document.getElementById(idcomponent);
    elnav = document.getElementById(idnav);
    elcontent = document.getElementById(idcontent);

    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);
    window.dispatchEvent(new Event('resize'));
  });

  onDestroy(()=>{
    window.removeEventListener('resize', handle_auto_resize);
    unsubLogin();
  });
  
</script>
<style>
  .mainbody{
    width:100%;
    height:100%;
  }
</style>

<div id="{idcomponent}" class="mainbody">
    <div id={idnav} class="navmenu">
      <DisplayUserComponent></DisplayUserComponent>
      {#if blogin}
        Hello
      {:else}
        <!---->
      {/if}
    </div>
    <div id={idcontent} class="content">
      {#if blogin}
        <!--<EditorMainComponent></EditorMainComponent>-->
        <LayoutLayoutComponent></LayoutLayoutComponent>
      {:else}
        <LoginComponent></LoginComponent>
      {/if}
    </div>
</div>

<NotificationDisplay></NotificationDisplay>
