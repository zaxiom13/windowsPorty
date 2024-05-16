<script lang="ts">
  export let visible: boolean = false;
</script>

<style>
  .start-menu {
      position: absolute;
      bottom: 40px; /* Adjust based on the height of the taskbar */
      left: 10px;
      width: 200px;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: none;
  }

  .start-menu.visible {
      display: block;
  }

  .start-menu div {
      padding: 10px;
      cursor: pointer;
  }

  .start-menu div:hover {
      background-color: #f0f0f0;
  }
</style>

<div class="start-menu {visible ? 'visible' : ''}">
  <!-- Start menu content goes here -->
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
