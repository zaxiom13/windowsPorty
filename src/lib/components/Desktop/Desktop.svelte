<script lang="ts">
    import { onMount } from 'svelte';
    import Taskbar from '../Taskbar/Taskbar.svelte';
    import Tile from '../Window/Tile.svelte';
    import { tilesStore } from '$lib/stores/tilesStore';
    import { backgroundColor } from '$lib/stores/backgroundColorStore';
    import '$lib/styles/desktop.css';
  
    export let startMenuItems: string[] = [];
  
    let desktop: HTMLDivElement;
  
    function handleStartMenuItemClick(item: string) {
      tilesStore.add(desktop, item);
    }
  
    onMount(() => {
      // Any initialization logic can go here
    });
  </script>
  
  <div class="desktop" bind:this={desktop} style:background-color={$backgroundColor}>
    {#each $tilesStore as tile (tile.id)}
      <Tile 
        {...tile}
        {desktop}
        on:focus={() => tilesStore.focus(tile.id)}
        on:minimize={() => tilesStore.minimize(tile.id)}
        on:close={() => tilesStore.close(tile.id)}
      />
    {/each}
    <Taskbar 
      on:menuItemClick={({ detail }) => handleStartMenuItemClick(detail)}
      {startMenuItems}
    />
  </div>
  
  <style>
    .desktop {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }
  </style>