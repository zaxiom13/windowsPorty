<script lang="ts">
  import Calculator from './Calculator.svelte';
  import Notepad from './Notepad.svelte';
  import Settings from './Settings.svelte';

  export let title: string;
</script>

<div class="body">
  {#if title === 'Calculator'}
    <Calculator />
  {:else if title === 'Notepad'}
    <Notepad />
  {:else if title === 'Settings'}
    <Settings />
  {:else}
    <p>Window Content for {title}</p>
  {/if}
</div>

<style>
  .body {
    width: 100%;
    height: calc(100% - 22px);
    background-color: #ffffff;
    flex: 1;
    border: 1px solid #808080;
    border-top-color: #ffffff;
    padding: 2px;
    font-family: 'Tahoma', sans-serif;
    font-size: 11px;
    overflow: auto;
  }
</style>