<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import mjs from '../../mjs.js';

  import HeaderSplitterComponent from '../base/HeaderSplitterComponent.svelte';
  import AlignRegionComponent from '../base/AlignRegionComponent.svelte';
  import ScreenRegionComponent from '../base/ScreenRegionComponent.svelte';

  import EditorMainComponent from '../editor/EditorMainComponent.svelte';
  import SplitterComponent from '../base/SplitterComponent.svelte';

  import LayoutDividerVComponent from './LayoutDividerVComponent.svelte';

  let idcomponent = generateId();
  let elcomponent;

  let idregion1 = generateId(20);
  let idhregion1 = generateId(20);
  let idhregion2 = generateId(20);

  function handle_divider_resize(event){
    //console.log("resize");
    let parent = elcomponent.parentNode;
    if(parent){
      elcomponent.style.height = parent.clientHeight + 'px';
      elcomponent.style.width = parent.clientWidth + 'px';
    }
  }

  onMount(() => {
    elcomponent = document.getElementById(idcomponent);
    handle_divider_resize();
    window.addEventListener('resize', handle_divider_resize);
  });

  onDestroy(()=>{
		window.removeEventListener('resize', handle_divider_resize);
	});
</script>

<style>
	
</style>

<div id={idcomponent} class="">
  <HeaderSplitterComponent bhorizontal={false} bresize={false} iddiv1={idregion1} />
  <AlignRegionComponent idcomponent={idregion1} align="v">

    <ScreenRegionComponent idcomponent={idhregion1}>
      <EditorMainComponent editortype="viewport3D"></EditorMainComponent>
    </ScreenRegionComponent>

    <SplitterComponent bhorizontal={true} bresize={true} iddiv1={idhregion1} iddiv2={idhregion2}></SplitterComponent>

    <LayoutDividerVComponent idcomponent={idhregion2} ></LayoutDividerVComponent>

  </AlignRegionComponent>
</div>
