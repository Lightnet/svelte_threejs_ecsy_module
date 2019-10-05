<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import "codemirror/mode/javascript/javascript";
  //import "codemirror/lib/codemirror.css";
  //import "codemirror/addon/edit/closebrackets";

  import CodeMirror from "codemirror/lib/codemirror";

  let editorCodeMirror;
  let idcomponent = "editor-" + generateId();
  let elcontext;

  let idtextarea = "text-" + generateId();
  let eltextarea;

  function handle_auto_resize(event){
    if(elcontext == null){
      return;
    }
    //console.log("resize");
    let parent = elcontext.parentNode;
    elcontext.style.height = parent.clientHeight + 'px';
    elcontext.style.width = parent.clientWidth + 'px';

    eltextarea.style.height = (parent.clientHeight - 22) + 'px';
    //console.log(parent.clientWidth);
    //console.log(parent.clientHeight);
    editorCodeMirror.setSize(parent.clientWidth, parent.clientHeight);
  }

  onMount(() => {
    elcontext = document.getElementById(idcomponent);
    eltextarea = document.getElementById(idtextarea);
    
    //console.log(CodeMirror);
    editorCodeMirror = CodeMirror(document.getElementById(idtextarea), {
      value: "function myScript(){return 100;}\n",
      lineNumbers: true,
      mode:  "javascript"
    });
    //https://codemirror.net/doc/manual.html#api
    //editorCodeMirror.setSize("100%", "100%");
    //editorCodeMirror.refresh()

    //console.log(editorCodeMirror.getValue());

    //editorCodeMirror.setValue("Hello World!");




    handle_auto_resize();
    window.addEventListener('resize', handle_auto_resize);
    window.dispatchEvent(new Event('resize'));
    //editorCodeMirror = CodeMirror.fromTextArea(document.getElementById(idtextarea), {
      //value: "function myScript(){return 100;}\n",
      //lineNumbers: true,
      //mode:  "javascript"
    //});

  });

  onDestroy(()=>{
		window.removeEventListener('resize', handle_auto_resize);
  });

</script>

<style>
  .texteditor{
    width:100%;
    height:100%;
  }
</style>

<div id={idcomponent} >
  <!--TextEditorMainComponent-->
  <div id={idtextarea} class="texteditor">
  
  </div>
  <!--
  <textarea id={idtextarea} name="code" class="texteditor"></textarea>
  -->
</div>
