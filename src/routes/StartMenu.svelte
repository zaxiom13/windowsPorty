<script lang="ts">
  export let visible: boolean = false;
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

  .start-menu div {
    padding: 4px 8px;
    cursor: pointer;
    font-family: 'Tahoma', sans-serif;
    font-size: 11px;
  }

  .start-menu div:hover {
    background-color: #000080;
    color: white;
  }
</style>

<div class="start-menu {visible ? 'visible' : ''}">
  <div>Programs</div>
  <div>Documents</div>
  <div>Settings</div>
  <div>Find</div>
  <div>Help</div>
  <div>Run...</div>
  <div>Log Off...</div>
  <div>Shut Down...</div>
</div>