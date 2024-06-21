// File: lib/utils/restoreTile.ts

import type { TileData } from '../types/TileData';

export function restoreTile(tiles: TileData[], id: number): TileData[] {
    const maxZIndex = Math.max(...tiles.map(tile => tile.zIndex));
    return tiles.map(tile => 
        tile.id === id 
            ? { ...tile, isMinimized: false, isFocused: true, zIndex: maxZIndex + 1 } 
            : { ...tile, isFocused: false }
    );
}