import type { TileData } from '$lib/types/TileData';

export function addTile(tiles: TileData[], nextTileId: number, desktop: HTMLDivElement, title: string): TileData[] {
    const desktopRect = desktop.getBoundingClientRect();
    const tileWidth = 300;
    const tileHeight = 200;

    const maxX = desktopRect.width - tileWidth;
    const maxY = desktopRect.height - tileHeight - 28;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    const maxZIndex = Math.max(0, ...tiles.map(tile => tile.zIndex));

    const newTile: TileData = { 
        id: nextTileId, 
        x, 
        y, 
        title, 
        isFocused: true, 
        isMinimized: false, 
        zIndex: maxZIndex + 1 
    };
    return [...tiles.map(tile => ({ ...tile, isFocused: false })), newTile];
}

export function focusTile(tiles: TileData[], id: number): TileData[] {
    const maxZIndex = Math.max(...tiles.map(tile => tile.zIndex));
    return tiles.map(tile => ({
        ...tile,
        isFocused: tile.id === id && !tile.isMinimized,
        zIndex: tile.id === id ? maxZIndex + 1 : tile.zIndex
    }));
}

export function minimizeTile(tiles: TileData[], id: number): TileData[] {
    const updatedTiles = tiles.map(tile => 
        tile.id === id ? { ...tile, isMinimized: true, isFocused: false } : tile
    );
    return focusTopmostTile(updatedTiles);
}

export function restoreTile(tiles: TileData[], id: number): TileData[] {
    const maxZIndex = Math.max(...tiles.map(tile => tile.zIndex));
    return tiles.map(tile => 
        tile.id === id 
            ? { ...tile, isMinimized: false, isFocused: true, zIndex: maxZIndex + 1 } 
            : { ...tile, isFocused: false }
    );
}

export function focusTopmostTile(tiles: TileData[]): TileData[] {
    const visibleTiles = tiles.filter(tile => !tile.isMinimized);
    if (visibleTiles.length === 0) return tiles;
    
    const maxZIndex = Math.max(...visibleTiles.map(tile => tile.zIndex));
    const topmostTileId = visibleTiles.find(tile => tile.zIndex === maxZIndex)!.id;
    
    return tiles.map(tile => ({
        ...tile,
        isFocused: tile.id === topmostTileId,
        zIndex: tile.id === topmostTileId ? maxZIndex + 1 : tile.zIndex
    }));
}