// File: lib/utils/focusTopmostTile.ts

import type { TileData } from '../types/TileData';

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