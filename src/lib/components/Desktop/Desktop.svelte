<script lang="ts">
    import { onMount } from 'svelte';
    import Taskbar from '../Taskbar/Taskbar.svelte';
    import Tile from '../Window/Tile.svelte';
    import { tilesStore } from '$lib/stores/tilesStore';
    import { backgroundColor } from '$lib/stores/backgroundColorStore';
    import '$lib/styles/desktop.css';
    import type { StartMenuStructure } from '$lib/types/StartMenuItem';
  
    export let startMenuStructure: StartMenuStructure;
  
    let desktop: HTMLDivElement;
  
    function handleStartMenuItemClick(component: string) {
      tilesStore.add(desktop, component);
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
      {startMenuStructure}
      on:menuItemClick={({ detail }) => handleStartMenuItemClick(detail)}
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