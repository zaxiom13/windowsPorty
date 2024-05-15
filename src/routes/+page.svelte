<script lang="ts">
	import { onMount } from 'svelte';
  
	let tile: HTMLDivElement;
	let desktop: HTMLDivElement;
	let isDragging = false;
	let startX: number, startY: number, initialX: number, initialY: number;
  
	const onMouseDown = (event: MouseEvent) => {
	  isDragging = true;
	  startX = event.clientX;
	  startY = event.clientY;
	  initialX = tile.offsetLeft;
	  initialY = tile.offsetTop;
  
	  event.preventDefault();
	};
  
	const onMouseMove = (event: MouseEvent) => {
	  if (!isDragging) return;
  
	  const dx = event.clientX - startX;
	  const dy = event.clientY - startY;
  
	  let newX = initialX + dx;
	  let newY = initialY + dy;
  
	  // Boundary conditions
	  const rect = desktop.getBoundingClientRect();
	  const tileRect = tile.getBoundingClientRect();
  
	  if (newX < 0) newX = 0;
	  if (newY < 0) newY = 0;
	  if (newX + tileRect.width > rect.width) newX = rect.width - tileRect.width;
	  if (newY + tileRect.height > rect.height) newY = rect.height - tileRect.height;
  
	  tile.style.left = `${newX}px`;
	  tile.style.top = `${newY}px`;
	};
  
	const onMouseUp = () => {
	  isDragging = false;
	};
  
	onMount(() => {
	  document.addEventListener('mousemove', onMouseMove);
	  document.addEventListener('mouseup', onMouseUp);
  
	  return () => {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
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
	  width: 100px;
	  height: 100px;
	  background-color: #3498db;
	  position: absolute;
	  top: 0;
	  left: 0;
	  cursor: grab;
	}
  
	.tile:active {
	  cursor: grabbing;
	}
  </style>
  
  <div class="desktop" bind:this={desktop}>
	<div class="tile" bind:this={tile} on:mousedown={onMouseDown}></div>
  </div>
  