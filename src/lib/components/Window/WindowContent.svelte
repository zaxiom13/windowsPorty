<script lang="ts">
  import Calculator from '../../applications/Calculator.svelte';
  import Notepad from '../../applications/Notepad.svelte';
  import Settings from '../../applications/Settings.svelte';
  import Paint from '../../applications/Paint.svelte';
  import FileExplorer from '../../applications/FileExplorer.svelte';
  import InternetExplorer from '../../applications/InternetExplorer.svelte';
  import Minesweeper from '../../applications/Minesweeper.svelte';
  import Solitaire from '../../applications/Solitaire.svelte';
  import WordPad from '../../applications/WordPad.svelte';
  import WindowsMaker from '../../applications/WindowsMaker.svelte'; // Add this line

  export let title: string;
</script>

<div class="body">
  {#if title === 'Calculator'}
    <Calculator />
  {:else if title === 'Notepad'}
    <Notepad />
  {:else if title === 'Settings'}
    <Settings />
  {:else if title === 'Paint'}
    <Paint />
  {:else if title === 'File Explorer'}
    <FileExplorer />
  {:else if title === 'Internet Explorer'}
    <InternetExplorer />
  {:else if title === 'Minesweeper'}
    <Minesweeper />
  {:else if title === 'Solitaire'}
    <Solitaire />
  {:else if title === 'WordPad'}
    <WordPad />
  {:else if title === 'WindowsMaker'}
    <WindowsMaker />
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