
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
</script>

<button class="start-button" on:click={handleClick}>Start</button>

<style>
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
</style>