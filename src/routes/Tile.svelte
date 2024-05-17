<script lang="ts">
	import { onMount } from 'svelte';
	import ResizeHandle from './ResizeHandle.svelte';
	import { Tile as TileClass } from './../Tile';

	export let desktop: HTMLDivElement;
	export let id: number;
	export let x: number = 0;
	export let y: number = 0;

	let tile: HTMLDivElement;
	let tileInstance: TileClass;

	const directions = [
		'top-left', 'top-right', 'bottom-left', 'bottom-right',
		'top', 'bottom', 'left', 'right'
	];

	onMount(() => {
		tileInstance = new TileClass(tile, desktop);
		tile.style.left = `${x}px`;
		tile.style.top = `${y}px`;
	});

	function handleMouseLeave() {
		tileInstance?.handleMouseLeave();
	}
</script>

<div class="tile" bind:this={tile} on:mouseleave={handleMouseLeave}>
	<div class="titlebar">Title Bar</div>
	<div class="body">Tile Body</div>
	{#each directions as direction}
		<ResizeHandle {direction} />
	{/each}
</div>

<style>
	.tile {
		width: 200px;
		height: 200px;
		background-color: #3498db;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		min-width: 100px;
		min-height: 100px;
		max-width: 500px;
		max-height: 500px;
	}

	.titlebar:active {
		cursor: grabbing;
	}

	.body {
		width: 100%;
		height: calc(100% - 30px);
		background-color: #ecf0f1;
		flex: 1;
	}
</style>
