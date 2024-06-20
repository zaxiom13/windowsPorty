<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from './Taskbar.svelte';
	import Tile from './Tile.svelte';

	let desktop: HTMLDivElement;
	let tiles: Array<{ id: number, x: number, y: number, title: string }> = [];
	let nextTileId = 0;

	onMount(() => {
		// No initial tiles
	});

	function addTile(title: string) {
		const desktopRect = desktop.getBoundingClientRect();
		const tileWidth = 300;
		const tileHeight = 200;

		// Calculate random position
		const maxX = desktopRect.width - tileWidth;
		const maxY = desktopRect.height - tileHeight;
		const x = Math.floor(Math.random() * maxX);
		const y = Math.floor(Math.random() * maxY);

		tiles = [...tiles, { id: nextTileId++, x, y, title }];
	}

	function handleStartMenuItemClick(item: string) {
		addTile(item);
	}
</script>

<div class="desktop" bind:this={desktop}>
	{#each tiles as tile (tile.id)}
		<Tile {desktop} id={tile.id} x={tile.x} y={tile.y} title={tile.title} />
	{/each}
	<Taskbar on:menuItemClick={({ detail }) => handleStartMenuItemClick(detail)} />
</div>

<style>
	.desktop {
		width: 100%;
		height: 100vh;
		background-color: #008080;
		position: relative;
		overflow: hidden;
	}
</style>