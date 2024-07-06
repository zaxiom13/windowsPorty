<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="start-button" on:click={handleClick}>Start</button>

<style>
	.start-button {
		background: linear-gradient(to bottom, #5cb85c, #4cae4c);
		border: none;
		color: white;
		padding: 5px 15px;
		font-weight: bold;
		border-radius: 3px;
		cursor: pointer;
		transition: background 0.3s;
	}

	.start-button:hover {
		background: linear-gradient(to bottom, #4cae4c, #5cb85c);
	}

	.start-button:before {
		content: '';
		display: inline-block;
		width: 16px;
		height: 16px;
		background-color: #008080;
		margin-right: 4px;
	}

	.start-button:active {
		border: 2px solid #808080;
		border-right-color: #ffffff;
		border-bottom-color: #ffffff;
	}
</style>
