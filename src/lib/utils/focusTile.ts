import type { TileData } from '../types/TileData';

export function focusTile(tiles: TileData[], id: number): TileData[] {
    const maxZIndex = Math.max(...tiles.map(tile => tile.zIndex));
    return tiles.map(tile => ({
        ...tile,
        isFocused: tile.id === id && !tile.isMinimized,
        zIndex: tile.id === id ? maxZIndex + 1 : tile.zIndex
    }));
}