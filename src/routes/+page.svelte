<script lang="ts">
	import { onMount } from 'svelte';
	import {
	  setTileElement,
	  setDesktopElement,
	  onMouseDown,
	  onMouseMove,
	  onMouseUp
	} from './../window.svelte.ts'

  
	let tile: HTMLDivElement;
	let desktop: HTMLDivElement;
  
	onMount(() => {
	  setTileElement(tile);
	  setDesktopElement(desktop);
  
	  return () => {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	  };
	});
  </script>
  
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
	}
  
	.titlebar {
	  width: 100%;
	  height: 30px;
	  background-color: #2980b9;
	  cursor: grab;
	  user-select: none; /* Prevent text selection while dragging */
	}
  
	.titlebar:active {
	  cursor: grabbing;
	}
  
	.body {
	  width: 100%;
	  height: calc(100% - 30px);
	  background-color: #ecf0f1;
	}
  </style>
  
  <div class="desktop" bind:this={desktop}>
	<div class="tile" bind:this={tile} on:mousedown={onMouseDown}>
	  <div class="titlebar">Title Bar</div>
	  <div class="body">Tile Body</div>
	</div>
  </div>
  