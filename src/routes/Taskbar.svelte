<script lang="ts">
  import { onMount } from 'svelte';
  import StartMenu from './StartMenu.svelte';

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
    height: 40px;
    background-color: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: white;
    box-sizing: border-box;
  }

  .start-button {
    background-color: #3498db;
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  .start-button:hover {
    background-color: #2980b9;
  }
</style>

<div class="taskbar">
  <button class="start-button" on:click={toggleStartMenu}>Start</button>
</div>

<StartMenu visible={isStartMenuVisible} />
