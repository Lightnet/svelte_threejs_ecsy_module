<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';

  import Folder from '../base/FolderComponent.svelte';

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

  let root = [
		{
			type: 'folder',
			name: 'Important work stuff',
			files: [
				{ type: 'file', name: 'quarterly-results.xlsx' }
			]
		},
		{
			type: 'folder',
			name: 'Animal GIFs',
			files: [
				{
					type: 'folder',
					name: 'Dogs',
					files: [
						{ type: 'file', name: 'treadmill.gif' },
						{ type: 'file', name: 'rope-jumping.gif' }
					]
				},
				{
					type: 'folder',
					name: 'Goats',
					files: [
						{ type: 'file', name: 'parkour.gif' },
						{ type: 'file', name: 'rampage.gif' }
					]
				},
				{ type: 'file', name: 'cat-roomba.gif' },
				{ type: 'file', name: 'duck-shuffle.gif' },
				{ type: 'file', name: 'monkey-on-a-pig.gif' }
			]
		},
		{ type: 'file', name: 'TODO.md' }
	];

</script>

<style>

</style>

<div  id={idcomponent} >
  <!--OutlinerMainComponent-->
  <Folder name="Home" files={root} expanded/>

</div>
