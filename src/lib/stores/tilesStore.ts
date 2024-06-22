import { writable } from 'svelte/store';
import type { TileData } from '../types/TileData';
import { addTile } from '../utils/addTile';
import { focusTile } from '../utils/focusTile';
import { minimizeTile } from '../utils/minimizeTile';
import { restoreTile } from '../utils/restoreTile';
import { focusTopmostTile } from '../utils/focusTopmostTile';

function createTilesStore() {
    const { subscribe, update } = writable<TileData[]>([]);
    let nextTileId = 0;

    return {
        subscribe,
        add: (desktop: HTMLDivElement, title: string) => update(tiles => 
            addTile(tiles, nextTileId++, desktop, title)
        ),
        focus: (id: number) => update(tiles => 
            focusTile(tiles, id)
        ),
        minimize: (id: number) => update(tiles => 
            minimizeTile(tiles, id)
        ),
        restore: (id: number) => update(tiles => 
            restoreTile(tiles, id)
        ),
        close: (id: number) => update(tiles => {
            const updatedTiles = tiles.filter(tile => tile.id !== id);
            return focusTopmostTile(updatedTiles);
        }),
        focusTopmost: () => update(focusTopmostTile)
    };
}

export const tilesStore = createTilesStore();