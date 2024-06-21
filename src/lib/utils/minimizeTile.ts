// File: lib/utils/minimizeTile.ts

import type { TileData } from '../types/TileData';
import { focusTopmostTile } from './focusTopmostTile';

export function minimizeTile(tiles: TileData[], id: number): TileData[] {
    const updatedTiles = tiles.map(tile => 
        tile.id === id ? { ...tile, isMinimized: true, isFocused: false } : tile
    );
    return focusTopmostTile(updatedTiles);
}