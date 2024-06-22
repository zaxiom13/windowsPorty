<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let visible: boolean = false;
  
  const dispatch = createEventDispatcher();

  export let items = [
    "Programs",
    "Documents",
    "Settings",
    "Find",
    "Help",
    "Run...",
    "Log Off...",
    "Shut Down..."
  ];

  function handleItemClick(item: string) {
    dispatch('menuItemClick', item);
  }
</script>

<style>
  .start-menu {
    position: absolute;
    bottom: 28px;
    left: 2px;
    width: 200px;
    background-color: #D4D0C8;
    border: 2px solid #808080;
    border-bottom: none;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    display: none;
    z-index: 10001;
  }

  .start-menu.visible {
    display: block;
  }

  .menu-item {
    padding: 4px 8px;
    cursor: pointer;
    font-family: 'Tahoma', sans-serif;
    font-size: 11px;
  }

  .menu-item:hover {
    background-color: #000080;
    color: white;
  }
</style>

<div class="start-menu {visible ? 'visible' : ''}">
  {#each items as item}
    <div class="menu-item" on:click={() => handleItemClick(item)}>{item}</div>
  {/each}
</div>