class TileManager {
    private static instance: TileManager;
    private tiles: HTMLDivElement[] = [];
  
    private constructor() {}
  
    public static getInstance(): TileManager {
      if (!TileManager.instance) {
        TileManager.instance = new TileManager();
      }
      return TileManager.instance;
    }
  
    public registerTile(tile: HTMLDivElement) {
      this.tiles.push(tile);
      this.reindexTiles();
    }
  
    public bringToFront(tile: HTMLDivElement) {
      this.tiles = this.tiles.filter(t => t !== tile);
      this.tiles.push(tile);
      this.reindexTiles();
    }
  
    private reindexTiles() {
      this.tiles.forEach((tile, index) => {
        tile.style.zIndex = String(index + 1);
      });
    }
  }
  
  export const tileManager = TileManager.getInstance();
  