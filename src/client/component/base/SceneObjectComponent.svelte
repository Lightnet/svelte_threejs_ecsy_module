<script>
	import { onSelectObj } from '../../mjs';

  //https://svelte.dev/examples#svelte-self
	export let name;
	$: type = name.slice(name.lastIndexOf('.') + 1);
	export let uuid;

	function ClickSelect(){
		//console.log("Select!"+uuid);
		onSelectObj.set(uuid);
	}
</script>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
	}
</style>

<span style="background-image: url(icons/{type}.svg)" on:click={ClickSelect}>{name}</span>