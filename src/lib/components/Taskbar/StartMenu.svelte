<!-- File: lib/components/Taskbar/StartMenu.svelte -->
<script lang="ts">
	import type { StartMenuStructure } from '$lib/types/StartMenuItem';
	import { createEventDispatcher } from 'svelte';
	import MenuItemComponent from './MenuItemComponent.svelte';

	export let menuStructure: StartMenuStructure;
	export let visible: boolean = false;

	const dispatch = createEventDispatcher();

	function handleMenuItemClick(event: CustomEvent<string>) {
		dispatch('menuItemClick', event.detail);
	}
</script>

<div class="start-menu" class:visible>
	{#each menuStructure.items as item}
		<MenuItemComponent {item} on:menuItemClick={handleMenuItemClick} />
	{/each}
</div>

<style>
	.start-menu {
		position: absolute;
		bottom: var(--taskbar-height);
		left: 0;
		width: 250px;
		background-color: rgba(255, 255, 255, 0.9);
		border: 1px solid #ccc;
		border-radius: 0 5px 0 0;
		box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.1);
		display: none;
		z-index: 10000;
	}

	.start-menu.visible {
		display: block;
	}
</style>
