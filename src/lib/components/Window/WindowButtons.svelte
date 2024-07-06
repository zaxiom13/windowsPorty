<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleMinimize() {
		dispatch('minimize');
	}

	function handleMaximize() {
		dispatch('maximize');
	}

	function handleClose() {
		dispatch('close');
	}
</script>

<div class="window-controls buttons">
	<button class="window-button minimize" on:click={handleMinimize}>_</button>
	<button class="window-button maximize" on:click={handleMaximize}>□</button>
	<button class="window-button close" on:click={handleClose}>X</button>
</div>

<style>
	.buttons {
		display: flex;
	}

	.buttons button {
		width: 16px;
		height: 14px;
		margin-left: 2px;
		border: 1px solid #ffffff;
		background-color: #d4d0c8;
		color: #000000;
		font-size: 9px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.window-controls {
		display: flex;
		gap: 5px;
	}

	.window-button {
		width: 16px;
		height: 16px;
		border: 1px solid white;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10px;
		color: white;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.minimize {
		background-color: #ffbd44;
	}
	.maximize {
		background-color: #00ca4e;
	}
	.close {
		background-color: #ff605c;
	}

	.window-button:hover {
		filter: brightness(1.1);
	}

</style>
