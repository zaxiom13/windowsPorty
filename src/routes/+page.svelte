<script lang="ts">
    import { onMount } from 'svelte';
    import Taskbar from '$lib/components/Taskbar/Taskbar.svelte';
    import Tile from '$lib/components/Window/Tile.svelte';
    import type { TileData } from '$lib/types/TileData';
    import { addTile, focusTile, minimizeTile, restoreTile, focusTopmostTile } from '$lib/utils/tileUtils';

    let desktop: HTMLDivElement;
    let tiles: TileData[] = [];
    let nextTileId = 0;

    onMount(() => {
        // No initial tiles
    });

    function handleStartMenuItemClick(item: string) {
        tiles = addTile(tiles, nextTileId++, desktop, item);
    }

    function handleFocusTile(id: number) {
        tiles = focusTile(tiles, id);
    }

    function handleMinimizeTile(id: number) {
        tiles = minimizeTile(tiles, id);
    }

    function handleRestoreTile(id: number) {
        tiles = restoreTile(tiles, id);
    }

    function handleCloseTile(id: number) {
        tiles = tiles.filter(tile => tile.id !== id);
        tiles = focusTopmostTile(tiles);
    }
</script>

<div class="desktop" bind:this={desktop}>
    {#each tiles as tile (tile.id)}
        <Tile 
            {...tile}
            {desktop}
            on:focus={() => handleFocusTile(tile.id)}
            on:minimize={() => handleMinimizeTile(tile.id)}
            on:close={() => handleCloseTile(tile.id)}
        />
    {/each}
    <Taskbar 
        on:menuItemClick={({ detail }) => handleStartMenuItemClick(detail)}
        on:focusWindow={({ detail }) => handleFocusTile(detail)}
        on:restoreWindow={({ detail }) => handleRestoreTile(detail)}
        {tiles}
    />
</div>

<style>
    .desktop {
        width: 100%;
        height: 100vh;
        background-color: #008080;
        position: relative;
        overflow: hidden;
    }
</style>