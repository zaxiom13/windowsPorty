<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { StartMenuItem } from '$lib/types/StartMenuItem';

	export let item: StartMenuItem;

	const dispatch = createEventDispatcher();

	function handleClick() {
		if (item.component) {
			dispatch('menuItemClick', item.component);
		}
	}
</script>

<div
	class="start-menu-item menu-item"
	on:click={handleClick}
	class:has-submenu={item.items && item.items.length > 0}
>
	<span>{item.name}</span>
	{#if item.items && item.items.length > 0}
		<div class="submenu">
			{#each item.items as subItem}
				<svelte:self item={subItem} on:menuItemClick />
			{/each}
		</div>
	{/if}
</div>

<style>
	.menu-item {
		position: relative;
		padding: 4px 8px;
		cursor: pointer;
		font-family: 'Tahoma', sans-serif;
		font-size: 11px;
	}

	.menu-item:hover {
		background-color: #000080;
		color: white;
	}

	.has-submenu::after {
		content: '▶';
		position: absolute;
		right: 8px;
		font-size: 8px;
	}

	.submenu {
		display: none;
		position: absolute;
		left: 100%;
		top: 0;
		background-color: #d4d0c8;
		border: 1px solid #808080;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
	}

	.menu-item:hover > .submenu {
		display: block;
	}

	.start-menu-item {
		padding: 10px 15px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.start-menu-item:hover {
		background-color: var(--button-highlight);
		color: white;
	}
</style>
