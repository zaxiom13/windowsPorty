<script lang="ts">
	import { onMount } from 'svelte';
	import Taskbar from './Taskbar.svelte';
	import Tile from './Tile.svelte';
  
	let desktop: HTMLDivElement;
  
	onMount(() => {
	  // Additional setup if necessary
	});
  </script>
  
  <div class="desktop" bind:this={desktop}>
	<Tile {desktop} />
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
  </style>
  