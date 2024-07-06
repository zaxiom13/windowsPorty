<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import WindowButtons from './WindowButtons.svelte';

	export let title: string;
	export let isFocused: boolean;

	const dispatch = createEventDispatcher();

	function handleButtonAction(event: CustomEvent) {
		dispatch(event.type, event.detail);
	}
</script>

<div class="titlebar" class:focused={isFocused}>
	<div class="title">{title}</div>
	<WindowButtons
		on:minimize={handleButtonAction}
		on:maximize={handleButtonAction}
		on:close={handleButtonAction}
	/>
</div>

<style>
	.titlebar {
		background: var(--titlebar-gradient);
		color: var(--titlebar-text);
		padding: 5px 10px;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 7px 7px 0 0;
		user-select: none;
	}

	.titlebar.focused {
		background: linear-gradient(to right, #000080, #1084d0);
		color: white;
	}
</style>
