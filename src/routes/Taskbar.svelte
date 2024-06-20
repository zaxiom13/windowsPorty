<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import StartMenu from './StartMenu.svelte';

  const dispatch = createEventDispatcher();

  export let openWindows: Array<{ id: number, title: string, isFocused: boolean }> = [];

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

  function focusWindow(id: number) {
    dispatch('focusWindow', id);
  }

  onMount((): () => void => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<style>
  .taskbar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 28px;
    background-color: #D4D0C8;
    display: flex;
    align-items: center;
    padding: 0 2px;
    border-top: 2px solid #ffffff;
    box-sizing: border-box;
    z-index: 10000;
  }

  .start-button {
    background: linear-gradient(to bottom, #1fdf25, #0a9710);
    border: 2px solid #ffffff;
    border-right-color: #808080;
    border-bottom-color: #808080;
    color: white;
    font-weight: bold;
    font-size: 11px;
    padding: 2px 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 22px;
    margin-right: 4px;
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

  .window-tabs {
    display: flex;
    flex-grow: 1;
    overflow-x: auto;
    height: 100%;
  }

  .window-tab {
    background-color: #D4D0C8;
    border: 1px solid #808080;
    border-bottom: none;
    padding: 2px 8px;
    margin-right: 2px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    height: 22px;
    display: flex;
    align-items: center;
    font-family: 'Tahoma', sans-serif;
    font-size: 11px;
  }

  .window-tab.focused {
    background-color: #ffffff;
    border-top: 2px solid #ffffff;
    border-left: 2px solid #ffffff;
    border-right: 2px solid #808080;
  }
</style>

<div class="taskbar">
  <button class="start-button" on:click={toggleStartMenu}>Start</button>
  <div class="window-tabs">
    {#each openWindows as window (window.id)}
      <div 
        class="window-tab" 
        class:focused={window.isFocused}
        on:click={() => focusWindow(window.id)}
      >
        {window.title}
      </div>
    {/each}
  </div>
</div>

<StartMenu visible={isStartMenuVisible} on:menuItemClick={(event) => handleMenuItemClick(event.detail)} />