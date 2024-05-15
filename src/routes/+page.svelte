<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from './Taskbar.svelte'; // Adjust the path as necessary
	import ResizeHandle from './ResizeHandle.svelte'; // Import the new component
	import {
		setTileElement,
		setDesktopElement,
		onMouseDown,
		onMouseMove,
		onMouseUp,
		onResizeMove,
		onResizeUp,
		handleMouseLeave
	} from './../window.svelte';

	let tile: HTMLDivElement;
	let desktop: HTMLDivElement;

	const directions = [
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right',
		'top',
		'bottom',
		'left',
		'right'
	];

	onMount(() => {
		setTileElement(tile);
		setDesktopElement(desktop);

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mousemove', onResizeMove);
			window.removeEventListener('mouseup', onResizeUp);
		};
	});
</script>

<div class="desktop" bind:this={desktop} on:mouseleave={handleMouseLeave}>
	<div class="tile" bind:this={tile} on:mousedown={onMouseDown}>
		<div class="titlebar">Title Bar</div>
		<div class="body">Tile Body</div>
		{#each directions as direction}
			<ResizeHandle {direction} on:mousedown={onMouseDown} />
		{/each}
	</div>
	<Taskbar />
</div>

<style>
	.desktop {
		width: 100%;
		height: 100vh;
		border: 1px solid #000;
		position: relative;
		overflow: hidden;
	}

	.tile {
		width: 200px;
		height: 200px;
		background-color: #3498db;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		min-width: 100px; /* Set minimum width */
		min-height: 100px; /* Set minimum height */
		max-width: 500px; /* Set maximum width */
		max-height: 500px; /* Set maximum height */
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
