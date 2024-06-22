<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import StartButton from './StartButton.svelte';
  import StartMenu from './StartMenu.svelte';
  import TaskbarButton from './TaskbarButton.svelte';
  import { tilesStore } from '$lib/stores/tilesStore';
  import type { StartMenuStructure } from '$lib/types/StartMenuItem';

  const dispatch = createEventDispatcher();

  export let startMenuStructure: StartMenuStructure;

  let isStartMenuVisible: boolean = false;

  function toggleStartMenu(): void {
    isStartMenuVisible = !isStartMenuVisible;
  }

  function handleClickOutside(event: MouseEvent): void {
    const startMenu = document.querySelector('.start-menu') as HTMLElement;
    const startButton = document.querySelector('.start-button') as HTMLElement;

    if (startMenu && startButton && !startButton.contains(event.target as Node)) {
      isStartMenuVisible = false;
    }
  }

  function handleMenuItemClick(event: CustomEvent<string>) {
    dispatch('menuItemClick', event.detail);
    isStartMenuVisible = false;
  }

  function handleWindowClick(id: number, isMinimized: boolean) {
    if (isMinimized) {
      tilesStore.restore(id);
    } else {
      tilesStore.focus(id);
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="taskbar">
  <StartButton on:click={toggleStartMenu} />
  <div class="window-tabs">
    {#each $tilesStore as tile (tile.id)}
      <TaskbarButton
        title={tile.title}
        isFocused={tile.isFocused}
        isMinimized={tile.isMinimized}
        on:click={() => handleWindowClick(tile.id, tile.isMinimized)}
      />
    {/each}
  </div>
</div>

<StartMenu
  menuStructure={startMenuStructure}
  visible={isStartMenuVisible}
  on:menuItemClick={handleMenuItemClick}
/>

<style>
  .taskbar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 28px;
    background-color: #d4d0c8;
    display: flex;
    align-items: center;
    padding: 0 2px;
    border-top: 2px solid #ffffff;
    box-sizing: border-box;
    z-index: 10000;
  }

  .window-tabs {
    display: flex;
    flex-grow: 1;
    overflow-x: auto;
    height: 100%;
  }
</style>
