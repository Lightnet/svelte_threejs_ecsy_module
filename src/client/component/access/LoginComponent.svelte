<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import ModalComponent from "../base/ModalComponent.svelte";
    import { generateId } from '../../generateid.js';
    import { gun, setSea, onLogin, setUser } from '../../mjs.js';
    import { notifier } from '@beyonk/svelte-notifications';

    const dispatch = createEventDispatcher();
    let idcomponent = generateId(20);
    let loginid = "test";
    let password = "test";
    loginid="beta",password="beta";
    let showModal = false;
    let message = "";
    
    onMount(() => {
        //console.log("access?");
    });

    onDestroy(() => {
       password="";
       message="";
    });

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function btnlogin(e){
        if(isEmpty(loginid)||isEmpty(password)){
            console.log("empty");
            return;
        }
        let user = gun.user();
        user.auth(loginid, password,(ack)=>{
            if(ack.err){
                message = ack.err;
                notifier.warning(message);
            }else{
                notifier.success("Grant Access!");
                console.log(ack);
                setUser(ack.put);
                //setSea(ack.sea);
                onLogin.set(true);
            }
        });
    }

    function btnregister(e){
        //console.log(e);
        let user = gun.user();
        if(isEmpty(loginid)||isEmpty(password)){
            console.log("empty");
            return;
        }
        user.create(loginid, password, function(ack){
            //console.log(ack);
            if(ack.err){
                //console.log("fail!");
                message = ack.err;
                notifier.warning(message);
            }
            if(ack.pub){
                //console.log("created!", ack.pub);
                notifier.success("Alias Created!");
            }
        });
    }

    function clickForgot(e){
        dispatch("hevent",{action:"forgot"});
    }
</script>
<style>

</style>
<div id="{idcomponent}">
    <table>
        <tr>
            <td>Alias:</td>
            <td><input type="text" bind:value={loginid} placeholder="Alias"></td>
        </tr>
        <tr>
            <td>Password:</td>
            <td><input type="text" bind:value={password} placeholder="Passphase"></td>
        </tr><tr>
            <td>
                <button on:click={btnregister}>Register</button>
            </td><td style=" text-align: center;">
                <button on:click={btnlogin}>Login</button>
                <button on:click={clickForgot}>Forgot</button>
            </td>
        </tr>
    </table>
    
    {#if showModal}
    <ModalComponent on:close="{()=> {showModal=false;}}">
        <h2 slot="header">
            Message:
        </h2>
        <div slot="body">
            {message}
        </div>
    </ModalComponent>
    {/if}
</div>