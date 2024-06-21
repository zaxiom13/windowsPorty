

<script lang="ts">
  export let title: string;
</script>

<div class="body">
  Window Content for {title}
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
  }
</style>