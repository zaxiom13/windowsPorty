import type { TileData } from '$lib/types/TileData';

export function addTile(tiles: TileData[], nextTileId: number, desktop: HTMLDivElement, title: string): TileData[] {
	const desktopRect = desktop.getBoundingClientRect();
	const tileWidth = 300;
	const tileHeight = 200;

	const maxX = desktopRect.width - tileWidth;
	const maxY = desktopRect.height - tileHeight - 28;
	const x = Math.floor(Math.random() * maxX);
	const y = Math.floor(Math.random() * maxY);

	const newTile: TileData = { id: nextTileId, x, y, title, isFocused: true };
	return [...tiles.map(tile => ({ ...tile, isFocused: false })), newTile];
}

export function focusTile(tiles: TileData[], id: number): TileData[] {
	return tiles.map(tile => ({
		...tile,
		isFocused: tile.id === id
	}));
}