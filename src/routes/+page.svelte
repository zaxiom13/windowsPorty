<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from './Taskbar.svelte';
	import Tile from './Tile.svelte';

	let desktop: HTMLDivElement;
	let tiles: Array<{ id: number, x: number, y: number, title: string, isFocused: boolean }> = [];
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
		const maxY = desktopRect.height - tileHeight - 28; // Subtract taskbar height
		const x = Math.floor(Math.random() * maxX);
		const y = Math.floor(Math.random() * maxY);

		const newTile = { id: nextTileId++, x, y, title, isFocused: true };
		tiles = tiles.map(tile => ({ ...tile, isFocused: false }));
		tiles = [...tiles, newTile];
	}

	function handleStartMenuItemClick(item: string) {
		addTile(item);
	}

	function focusTile(id: number) {
		tiles = tiles.map(tile => ({
			...tile,
			isFocused: tile.id === id
		}));
	}
</script>

<div class="desktop" bind:this={desktop}>
	{#each tiles as tile (tile.id)}
		<Tile 
			{desktop} 
			id={tile.id} 
			x={tile.x} 
			y={tile.y} 
			title={tile.title}
			isFocused={tile.isFocused}
			on:focus={(event) => focusTile(event.detail)}
		/>
	{/each}
	<Taskbar 
		on:menuItemClick={({ detail }) => handleStartMenuItemClick(detail)}
		on:focusWindow={(event) => focusTile(event.detail)}
		openWindows={tiles}
	/>
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