

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleMinimize() {
    dispatch('minimize');
  }

  function handleMaximize() {
    dispatch('maximize');
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<div class="buttons">
  <button class="minimize" on:click={handleMinimize}>_</button>
  <button class="maximize" on:click={handleMaximize}>□</button>
  <button class="close" on:click={handleClose}>X</button>
</div>

<style>
  .buttons {
    display: flex;
  }

  .buttons button {
    width: 16px;
    height: 14px;
    margin-left: 2px;
    border: 1px solid #ffffff;
    background-color: #D4D0C8;
    color: #000000;
    font-size: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>