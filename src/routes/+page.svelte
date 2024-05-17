<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from './Taskbar.svelte';
	import Tile from './Tile.svelte';

	let desktop: HTMLDivElement;
	let tiles: Array<{ id: number, x: number, y: number }> = [];
	let nextTileId = 0;

	onMount(() => {
		// Add initial tiles if necessary
		addTile();
	});

	function addTile() {
		tiles = [...tiles, { id: nextTileId++, x: 50, y: 50 }];
	}
</script>

<div class="desktop" bind:this={desktop}>
	{#each tiles as tile}
		<Tile {desktop} id={tile.id} x={tile.x} y={tile.y} />
	{/each}
	<Taskbar />
	<button class="add-tile-button" on:click={addTile}>Add Tile</button>
</div>

<style>
	.desktop {
		width: 100%;
		height: 100vh;
		border: 1px solid #000;
		position: relative;
		overflow: hidden;
	}
	.add-tile-button {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 10;
		background-color: #3498db;
		color: white;
		border: none;
		padding: 10px;
		cursor: pointer;
		border-radius: 5px;
	}
	.add-tile-button:hover {
		background-color: #2980b9;
	}
</style>
