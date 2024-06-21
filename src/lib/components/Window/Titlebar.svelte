

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import WindowButtons from './WindowButtons.svelte';

  export let title: string;
  export let isFocused: boolean;

  const dispatch = createEventDispatcher();

  function handleButtonAction(event: CustomEvent) {
    dispatch(event.type, event.detail);
  }
</script>

<div class="titlebar" class:focused={isFocused}>
  <div class="title">{title}</div>
  <WindowButtons 
    on:minimize={handleButtonAction}
    on:maximize={handleButtonAction}
    on:close={handleButtonAction}
  />
</div>

<style>
  .titlebar {
    height: 18px;
    background: linear-gradient(to right, #7b7b7b, #a8a8a8);
    color: #d8d8d8;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 3px;
    cursor: move;
  }

  .titlebar.focused {
    background: linear-gradient(to right, #000080, #1084d0);
    color: white;
  }
</style>