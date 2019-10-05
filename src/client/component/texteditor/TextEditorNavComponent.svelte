<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  let idcomponent = "navmenu-" + generateId();
  let elcontext;
  let views = [];
  let view = "viewlayer" ;

  onMount(() => {
    
  });

  onDestroy(()=>{
		
  });

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

  <button>New</button>
  <button>Open</button>
  <button>Delete</button>
</div>