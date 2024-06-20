<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import ResizeHandle from './ResizeHandle.svelte';
	import { Tile as TileClass } from './../Tile';

	export let desktop: HTMLDivElement;
	export let id: number;
	export let x: number = 0;
	export let y: number = 0;
	export let title: string;
	export let isFocused: boolean = false;

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
		tileInstance = new TileClass(tile, desktop);
		tile.style.left = `${x}px`;
		tile.style.top = `${y}px`;
	});

	function focus() {
		dispatch('focus', id);
	}
</script>

<div class="tile" class:focused={isFocused} bind:this={tile} on:mousedown={focus}>
	<div class="titlebar" class:focused={isFocused}>
		<div class="title">{title}</div>
		<div class="buttons">
			<button class="minimize">_</button>
			<button class="maximize">□</button>
			<button class="close">X</button>
		</div>
	</div>
	<div class="body">Window Content for {title}</div>
	{#each directions as direction}
		<ResizeHandle {direction} />
	{/each}
</div>

<style>
	.tile {
		width: 300px;
		height: 200px;
		background-color: #D4D0C8;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		min-width: 100px;
		min-height: 100px;
		max-width: 500px;
		max-height: 500px;
		user-select: none;
		border: 2px solid #ffffff;
		border-right-color: #808080;
		border-bottom-color: #808080;
		box-shadow: 1px 1px 0 #000000;
	}

	.titlebar {
		height: 18px;
		background: linear-gradient(to right, #7b7b7b, #a8a8a8);
		color: #d8d8d8;
		font-weight: bold;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2px 3px;
	}

	.titlebar.focused {
		background: linear-gradient(to right, #000080, #1084d0);
		color: white;
	}

	.titlebar:active {
		cursor: grabbing;
	}

	.buttons {
		display: flex;
	}

	.buttons button {
		width: 16px;
		height: 14px;
		margin-left: 2px;
		border: 1px solid #ffffff;
		background-color: #D4D0C8;
		color: #000000;
		font-size: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.body {
		width: 100%;
		height: calc(100% - 22px);
		background-color: #ffffff;
		flex: 1;
		border: 1px solid #808080;
		border-top-color: #ffffff;
		padding: 2px;
		font-family: 'Tahoma', sans-serif;
		font-size: 11px;
	}

	.focused {
		z-index: 100;
	}
</style>