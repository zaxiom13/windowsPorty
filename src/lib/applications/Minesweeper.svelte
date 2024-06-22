<script lang="ts">
    let grid: number[][] = [];
    let revealed: boolean[][] = [];
    const size = 9;
    const mines = 10;
  
    function initializeGrid() {
      grid = Array(size).fill(null).map(() => Array(size).fill(0));
      revealed = Array(size).fill(null).map(() => Array(size).fill(false));
      
      // Place mines
      let minesPlaced = 0;
      while (minesPlaced < mines) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        if (grid[y][x] !== -1) {
          grid[y][x] = -1;
          minesPlaced++;
        }
      }
  
      // Calculate numbers
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          if (grid[y][x] === -1) continue;
          grid[y][x] = countAdjacentMines(x, y);
        }
      }
    }
  
    function countAdjacentMines(x: number, y: number): number {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < size && nx >= 0 && nx < size && grid[ny][nx] === -1) {
            count++;
          }
        }
      }
      return count;
    }
  
    function handleClick(x: number, y: number) {
      if (revealed[y][x]) return;
      revealed[y][x] = true;
      if (grid[y][x] === 0) {
        revealAdjacent(x, y);
      }
    }
  
    function revealAdjacent(x: number, y: number) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < size && nx >= 0 && nx < size && !revealed[ny][nx]) {
            revealed[ny][nx] = true;
            if (grid[ny][nx] === 0) {
              revealAdjacent(nx, ny);
            }
          }
        }
      }
    }
  
    initializeGrid();
  </script>
  
  <div class="minesweeper">
    <div class="grid">
      {#each grid as row, y}
        <div class="row">
          {#each row as cell, x}
            <button class="cell" on:click={() => handleClick(x, y)} disabled={revealed[y][x]}>
              {#if revealed[y][x]}
                {cell === -1 ? '💣' : cell || ''}
              {/if}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .minesweeper {
      font-family: 'Tahoma', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .grid {
      display: inline-block;
      background-color: #c0c0c0;
      border: 2px solid #808080;
      border-top-color: #ffffff;
      border-left-color: #ffffff;
    }
    .row {
      display: flex;
    }
    .cell {
      width: 20px;
      height: 20px;
      border: 1px solid #808080;
      background-color: #c0c0c0;
      font-weight: bold;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .cell:disabled {
      background-color: #d3d3d3;
      border: 1px solid #a9a9a9;
    }
  </style>