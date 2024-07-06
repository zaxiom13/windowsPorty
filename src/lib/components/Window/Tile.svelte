<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResizeHandle from './ResizeHandle.svelte';
	import Titlebar from './Titlebar.svelte';
	import WindowContent from './WindowContent.svelte';
	import { Tile as TileClass } from '$lib/classes/Tile';
	import type { TileData } from '$lib/types/TileData';

	export let desktop: HTMLDivElement;
	export let id: number;
	export let x: number;
	export let y: number;
	export let title: string;
	export let isFocused: boolean;
	export let isMinimized: boolean = false;
	export let zIndex: number;

	const dispatch = createEventDispatcher();

	let tile: HTMLDivElement;
	let tileInstance: TileClass;

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
		tileInstance = new TileClass(tile, desktop, () => dispatch('focus', id));
		tile.style.left = `${x}px`;
		tile.style.top = `${y}px`;
	});

	function handleMouseDown(event: MouseEvent) {
		const titlebar = tile.querySelector('.titlebar');
		if (titlebar && titlebar.contains(event.target as Node)) {
			tileInstance.startDragging(event);
		}
		tileInstance.focus();
	}

	function handleTitlebarAction(event: CustomEvent) {
		dispatch(event.type, id);
	}

	$: tile && (tile.style.zIndex = zIndex.toString());
</script>

<div
	class="tile"
	class:focused={isFocused}
	class:minimized={isMinimized}
	bind:this={tile}
	on:mousedown={handleMouseDown}
>
	<Titlebar
		{title}
		{isFocused}
		on:minimize={handleTitlebarAction}
		on:maximize={handleTitlebarAction}
		on:close={handleTitlebarAction}
	/>
	<WindowContent {title} />
	{#each directions as direction}
		<ResizeHandle {direction} />
	{/each}
</div>

<style>
	.tile {
		width: 300px;
		height: 200px;
		background-color: #d4d0c8;
		position: absolute;
		top: 0;
		left: 0;
		position: absolute;
		min-width: 200px;
		min-height: 150px;
		background-color: var(--window-background);
		border: var(--window-border);
		border-radius: 8px 8px 0 0;
		box-shadow: var(--window-shadow);
		display: flex;
		flex-direction: column;
	}

	.tile.minimized {
		display: none;
	}

	.tile.focused {
		z-index: 100;
	}
</style>
