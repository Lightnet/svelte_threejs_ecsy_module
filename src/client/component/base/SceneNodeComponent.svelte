<script>
  //https://svelte.dev/examples#svelte-self
	import File from './SceneObjectComponent.svelte';
	import { onSelectObj } from '../../mjs';
	let selectObj = "";
	const unsubOnSelectObj = onSelectObj.subscribe(value => {
		console.log("list",value);
    selectObj = value;
  });

	export let expanded = false;
	export let name;
	export let files;

	function toggle() {
		expanded = !expanded;
	}
</script>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: url(icons/folder.svg) 0 0.1em no-repeat;
		background-size: 1em 1em;
		font-weight: bold;
		cursor: pointer;
	}

	.expanded {
		background-image: url(icons/folder-open.svg);
	}

	ul {
		padding: 0.2em 0 0 0.5em;
		margin: 0 0 0 0.5em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		padding: 0.2em 0;
	}

	li:nth-child(odd) {
		background-color: darkgrey;
	}

	li:nth-child(even) {
		background-color: dimgrey;
	}
	/*
	li:active {
		background-color: dodgerblue;
	}
	*/

	.selectobj {
		background-color: dodgerblue !important;
	}

</style>

<span class:expanded on:click={toggle}>{name}</span>

{#if expanded}
	<ul>
		{#each files as file}
			<li class="{selectObj === file.uuid ? 'selectobj' : ''}">
				{#if file.type === 'folder'}
					<svelte:self {...file}/>
				{:else}
					<File {...file}/>
				{/if}
			</li>
		{/each}
	</ul>
{/if}