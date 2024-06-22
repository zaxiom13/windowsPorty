<script lang="ts">
  import Desktop from '$lib/components/Desktop/Desktop.svelte';

  const startMenuItems = [
    'Calculator',
    'Notepad',
    'Settings',
    'Paint',
    'File Explorer',
    'Internet Explorer',
    'Minesweeper',
    'Solitaire',
    'WordPad'
  ];
</script>

<Desktop {startMenuItems} />