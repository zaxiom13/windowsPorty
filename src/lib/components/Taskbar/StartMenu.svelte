<!-- File: lib/components/Taskbar/StartMenu.svelte -->
<script lang="ts">
  import type { StartMenuStructure } from '$lib/types/StartMenuItem';
  import { createEventDispatcher } from 'svelte';
  import MenuItemComponent from './MenuItemComponent.svelte';

  export let menuStructure: StartMenuStructure;
  export let visible: boolean = false;
  
  const dispatch = createEventDispatcher();

  function handleMenuItemClick(event: CustomEvent<string>) {
    dispatch('menuItemClick', event.detail);
  }
</script>

<div class="start-menu" class:visible>
  {#each menuStructure.items as item}
    <MenuItemComponent {item} on:menuItemClick={handleMenuItemClick} />
  {/each}
</div>

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
</style>