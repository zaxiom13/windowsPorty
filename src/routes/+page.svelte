<script lang="ts">
	import { onMount } from 'svelte';
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
		<div class="resize-handle" data-direction="top-left"></div>
		<div class="resize-handle" data-direction="top-right"></div>
		<div class="resize-handle" data-direction="bottom-left"></div>
		<div class="resize-handle" data-direction="bottom-right"></div>
		<div class="resize-handle" data-direction="top"></div>
		<div class="resize-handle" data-direction="bottom"></div>
		<div class="resize-handle" data-direction="left"></div>
		<div class="resize-handle" data-direction="right"></div>
	</div>
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
	  flex: 1;
	}
  
	.resize-handle {
	  position: absolute;
	  background: transparent;
	}
  
	.resize-handle:hover {
	  background: #95a5a6;
	}
  
	.resize-handle[data-direction*='top'] {
	  top: -5px;
	  height: 10px;
	}
  
	.resize-handle[data-direction*='bottom'] {
	  bottom: -5px;
	  height: 10px;
	}
  
	.resize-handle[data-direction*='left'] {
	  left: -5px;
	  width: 10px;
	}
  
	.resize-handle[data-direction*='right'] {
	  right: -5px;
	  width: 10px;
	}
  
	.resize-handle[data-direction='top-left'] {
	  cursor: nwse-resize;
	  width: 10px;
	  height: 10px;
	}
  
	.resize-handle[data-direction='top-right'] {
	  cursor: nesw-resize;
	  width: 10px;
	  height: 10px;
	}
  
	.resize-handle[data-direction='bottom-left'] {
	  cursor: nesw-resize;
	  width: 10px;
	  height: 10px;
	}
  
	.resize-handle[data-direction='bottom-right'] {
	  cursor: nwse-resize;
	  width: 10px;
	  height: 10px;
	}
  
	.resize-handle[data-direction='top'] {
	  cursor: ns-resize;
	  width: 100%;
	}
  
	.resize-handle[data-direction='bottom'] {
	  cursor: ns-resize;
	  width: 100%;
	}
  
	.resize-handle[data-direction='left'] {
	  cursor: ew-resize;
	  height: 100%;
	}
  
	.resize-handle[data-direction='right'] {
	  cursor: ew-resize;
	  height: 100%;
	}
  </style>
  