<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import StartButton from './StartButton.svelte';
  import StartMenu from './StartMenu.svelte';
  import TaskbarButton from './TaskbarButton.svelte';
  import type { TileData } from '$lib/types/TileData';

  const dispatch = createEventDispatcher();

  export let tiles: TileData[] = [];
  export let startMenuItems: string[] = [];

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

  function handleMenuItemClick(item: string) {
    dispatch('menuItemClick', item);
    isStartMenuVisible = false;
  }

  function handleWindowClick(id: number, isMinimized: boolean) {
    dispatch(isMinimized ? 'restoreWindow' : 'focusWindow', id);
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="taskbar">
  <StartButton on:click={toggleStartMenu} />
  <div class="window-tabs">
    {#each tiles as tile (tile.id)}
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
  visible={isStartMenuVisible}
  items={startMenuItems}
  on:menuItemClick={(event) => handleMenuItemClick(event.detail)}
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