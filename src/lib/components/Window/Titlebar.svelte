<script lang="ts">
  export let title: string;
  export let isFocused: boolean;
</script>

<div class="titlebar" class:focused={isFocused}>
  <div class="title">{title}</div>
  <div class="buttons">
    <button class="minimize" on:click>_</button>
    <button class="maximize">□</button>
    <button class="close" on:click>X</button>
  </div>
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