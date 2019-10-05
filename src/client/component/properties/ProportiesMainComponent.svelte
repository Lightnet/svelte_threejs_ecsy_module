<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  let idcomponent = "editor-" + generateId();
  let elcontext;

  function handle_auto_resize(event){
    if(elcontext == null){
      return;
    }
    //console.log("resize");
    let parent = elcontext.parentNode;
    elcontext.style.height = parent.clientHeight + 'px';
    elcontext.style.width = parent.clientWidth + 'px';
  }

  onMount(() => {
    elcontext = document.getElementById(idcomponent);
    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);
  });

  onDestroy(()=>{
		window.removeEventListener('resize', handle_auto_resize);
  });

</script>

<style>

</style>

<div  id={idcomponent} >
  ProportiesMainComponent
</div>
