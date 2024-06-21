
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import ResizeHandle from './ResizeHandle.svelte';
  import Titlebar from './Titlebar.svelte';
  import WindowContent from './WindowContent.svelte';
  import { Tile as TileClass } from '$lib/classes/Tile';
  import type { TileData } from '$lib/types/TileData';

  export let desktop: HTMLDivElement;
  export let id: number;
  export let x: number;
  export let y: number;
  export let title: string;
  export let isFocused: boolean;
  export let isMinimized: boolean = false;
  export let zIndex: number;

  const dispatch = createEventDispatcher();

  let tile: HTMLDivElement;
  let tileInstance: TileClass;

  const directions = [
    'top-left', 'top-right', 'bottom-left', 'bottom-right',
    'top', 'bottom', 'left', 'right'
  ];

  onMount(() => {
    tileInstance = new TileClass(tile, desktop, () => dispatch('focus', id));
    tile.style.left = `${x}px`;
    tile.style.top = `${y}px`;
  });

  function handleMouseDown(event: MouseEvent) {
    const titlebar = tile.querySelector('.titlebar');
    if (titlebar && titlebar.contains(event.target as Node)) {
      tileInstance.startDragging(event);
    }
    tileInstance.focus();
  }

  function handleTitlebarAction(event: CustomEvent) {
    dispatch(event.type, id);
  }

  $: tile && (tile.style.zIndex = zIndex.toString());
</script>

<div class="tile" class:focused={isFocused} class:minimized={isMinimized} bind:this={tile} on:mousedown={handleMouseDown}>
  <Titlebar {title} {isFocused} 
    on:minimize={handleTitlebarAction}
    on:maximize={handleTitlebarAction}
    on:close={handleTitlebarAction}
  />
  <WindowContent {title} />
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

  .tile.minimized {
    display: none;
  }

  .tile.focused {
    z-index: 100;
  }
</style>