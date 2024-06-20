<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import StartMenu from './StartMenu.svelte';

  const dispatch = createEventDispatcher();

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
</style>

<div class="taskbar">
  <button class="start-button" on:click={toggleStartMenu}>Start</button>
</div>

<StartMenu visible={isStartMenuVisible} on:menuItemClick={(event) => handleMenuItemClick(event.detail)} />