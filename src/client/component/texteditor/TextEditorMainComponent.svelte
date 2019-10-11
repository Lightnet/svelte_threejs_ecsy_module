<script>
  import { onMount, onDestroy, createEventDispatcher} from 'svelte';
  import { generateId } from '../../generateid';
  import { gun } from '../../mjs';
  import "codemirror/mode/javascript/javascript";
  //import "codemirror/lib/codemirror.css";
  //import "codemirror/addon/edit/closebrackets";

  import CodeMirror from "codemirror/lib/codemirror";

  let editorCodeMirror;
  let idcomponent = "editor-" + generateId();
  let elcontext;

  let idtextarea = "text-" + generateId();
  let eltextarea;

  let guntextfiles;
  let isScript = false;
  let idScript;
  let textScript;

  export let ideditor;

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
      theme : "3024-night",
      mode:  "javascript"
    });

    //editorCodeMirror.setOption("theme", theme);
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
    getScriptList();

    window.addEventListener('editorevent', EditorEvents);

    editorCodeMirror.on("change",function(e){
      if(isScript){
        console.log("type...");
        if(idScript!=null){
          let textscript = editorCodeMirror.getValue();
          textScript=textscript;
          console.log(idScript);
          guntextfiles.get(idScript).put({content:textscript});
        }
      }
    });

    //work code
    //var jo = 'console.log("hello world")';
    //let urltest = getBlobURL(jo,'text/javascript')
    //console.log(urltest);
    //var worker = new Worker(urltest);
    //URL.revokeObjectURL(urltest);
    //worker.onmessage = function(e) {
      //console.log('worker returned: ', e.data);
    //};

  });

  function getBlobURL(code, type){
    let blob = new Blob([code], { type })
    return window.URL.createObjectURL(blob)
  }

  function EditorEvents(e){
    console.log(e);
    if(e.detail.ideditor == ideditor){
      if(e.detail.action == "scriptselect"){
        //console.log("found!");
        //TODOLIST
        if(e.detail.id !=null){//NEED TO FIX THIS! NO CHECKS
          isScript=true;
          idScript=e.detail.id;
          guntextfiles.get(e.detail.id).once(function(data){
            console.log(data);
            editorCodeMirror.setValue(data.content);
          });
        }
      }
      if(e.detail.action == "scripttextdelete"){
        //prevent adding content
        isScript=false;
        editorCodeMirror.setValue("");
      }
      if(e.detail.action == "runscript"){
        if(idScript == null){
          console.log("NULL SCRIPT!")
          return;
        }
        var win = window.open(
          'http://localhost:8080/debugscripteditor.html',
          //'_blank' // <- This is what makes it open in a new window.
          'test'//id tab
        );
        let jsURL = getBlobURL(textScript, 'text/javascript');
        var script = document.createElement('script');
        script.src = jsURL;
        win.document.head.appendChild(script);

        //win.document.open();
        //let jsURL = getBlobURL(textScript, 'text/javascript');
        //win.document.write(`<script src="${jsURL}" />`);
        //win.document.close();
        //$(debugwin.document).ready(()=>{
          //console.log("ready...")
        //});
        /*
        let jsURL = getBlobURL(textScript, 'text/javascript');
        //var worker = new Worker(jsURL);
        //URL.revokeObjectURL(jsURL);
        var jscript = document.createElement("script");
        jscript.type = "text/javascript";
        jscript.src = jsURL;
        //win.document.body.appendChild(jscript);
        function onload(){
          console.log("window loaded");
          debugwin.document.getElementById('targetDiv').appendChild(jscript);
          //console.log(debugwin.document.body);
          //console.log(jsURL);
        }
        if(debugwin.addEventListener){
          debugwin.addEventListener('load', onload)
        }else{
          debugwin.attachEvent('onload', onload)
        }
        */
      }
    }
  }

  async function getScriptList(){
    let user = gun.user();
    let pub = await user.get('pub');
    //console.log(user);
    //console.log(pub)
    guntextfiles = gun.get(user.is.pub).get('textscript');
    guntextfiles.once().map().once(function(data,key){
      //console.log("data ",data);
      //console.log("key ",key);
    });
  }

  onDestroy(()=>{
    window.removeEventListener('resize', handle_auto_resize);
    if(guntextfiles !=null){
      guntextfiles.off();
    }
  });

</script>

<style>
  .texteditor{
    width:100%;
    height:100%;
  }
</style>

<div id={idcomponent} >
  <div id={idtextarea} class="texteditor">
  
  </div>
</div>
