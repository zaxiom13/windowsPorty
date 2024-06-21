// File: lib/utils/addTile.ts

import type { TileData } from '../types/TileData';

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