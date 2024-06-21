
<script lang="ts">
  export let title: string;
  export let isFocused: boolean;
  export let isMinimized: boolean;
</script>

<div
  class="window-tab"
  class:focused={isFocused}
  class:minimized={isMinimized}
  on:click
>
  {title}
</div>

<style>
  .window-tab {
    background-color: #d4d0c8;
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

  .window-tab.minimized {
    background-color: #a0a0a0;
  }
</style>