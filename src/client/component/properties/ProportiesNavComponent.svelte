<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  let idcomponent = "navmenu-" + generateId();
  let elcontext;

  onMount(() => {
    
  });

  onDestroy(()=>{
		
  });

</script>

<style>
  .proportiesnavmenu{
    height:22px;
    float:left;
  }
</style>

<div id={idcomponent} class="proportiesnavmenu">
  Props Nav Menu
</div>