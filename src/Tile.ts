export class Tile {
    private tile: HTMLDivElement;
    private desktop: HTMLDivElement;
    private isDragging: boolean = false;
    private isResizing: boolean = false;
    private startX!: number;
    private startY!: number;
    private initialX!: number;
    private initialY!: number;
    private initialWidth!: number;
    private initialHeight!: number;
    private resizeDirection!: string;
  
    constructor(tile: HTMLDivElement, desktop: HTMLDivElement) {
      this.tile = tile;
      this.desktop = desktop;
      this.initializeEventListeners();
    }
  
    private initializeEventListeners() {
      this.tile.addEventListener('mousedown', this.onMouseDown.bind(this));
    }
  
    private onMouseDown(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('titlebar')) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.initialX = this.tile.offsetLeft;
        this.initialY = this.tile.offsetTop;
  
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        event.preventDefault();
      } else if (target.classList.contains('resize-handle')) {
        this.isResizing = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.initialWidth = this.tile.clientWidth;
        this.initialHeight = this.tile.clientHeight;
        this.initialX = this.tile.offsetLeft;
        this.initialY = this.tile.offsetTop;
        this.resizeDirection = target.dataset.direction as string;
  
        window.addEventListener('mousemove', this.onResizeMove.bind(this));
        window.addEventListener('mouseup', this.onResizeUp.bind(this));
        event.preventDefault();
      }
    }
  
    private onMouseMove(event: MouseEvent) {
      if (!this.isDragging) return;
  
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
  
      let newX = this.initialX + dx;
      let newY = this.initialY + dy;
  
      // Boundary conditions
      const rect = this.desktop.getBoundingClientRect();
      const tileRect = this.tile.getBoundingClientRect();
  
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + tileRect.width > rect.width) newX = rect.width - tileRect.width;
      if (newY + tileRect.height > rect.height) newY = rect.height - tileRect.height;
  
      this.tile.style.left = `${newX}px`;
      this.tile.style.top = `${newY}px`;
    }
  
    private onMouseUp() {
      this.isDragging = false;
      window.removeEventListener('mousemove', this.onMouseMove.bind(this));
      window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }
  
    private onResizeMove(event: MouseEvent) {
      if (!this.isResizing) return;
  
      const dx = event.clientX - this.startX;
      const dy = event.clientY - this.startY;
  
      let newWidth = this.initialWidth;
      let newHeight = this.initialHeight;
      let newX = this.initialX;
      let newY = this.initialY;
  
      if (this.resizeDirection.includes('right')) {
        newWidth = this.initialWidth + dx;
      }
      if (this.resizeDirection.includes('bottom')) {
        newHeight = this.initialHeight + dy;
      }
      if (this.resizeDirection.includes('left')) {
        newWidth = this.initialWidth - dx;
        newX = this.initialX + dx;
      }
      if (this.resizeDirection.includes('top')) {
        newHeight = this.initialHeight - dy;
        newY = this.initialY + dy;
      }
  
      // Apply min and max width and height
      const minWidth = 100;
      const minHeight = 100;
      const maxWidth = 500;
      const maxHeight = 500;
  
      if (newWidth < minWidth) {
        newWidth = minWidth;
        if (this.resizeDirection.includes('left')) {
          newX = this.initialX + (this.initialWidth - minWidth);
        }
      } else if (newWidth > maxWidth) {
        newWidth = maxWidth;
        if (this.resizeDirection.includes('left')) {
          newX = this.initialX + (this.initialWidth - maxWidth);
        }
      }
  
      if (newHeight < minHeight) {
        newHeight = minHeight;
        if (this.resizeDirection.includes('top')) {
          newY = this.initialY + (this.initialHeight - minHeight);
        }
      } else if (newHeight > maxHeight) {
        newHeight = maxHeight;
        if (this.resizeDirection.includes('top')) {
          newY = this.initialY + (this.initialHeight - maxHeight);
        }
      }
  
      this.tile.style.width = `${newWidth}px`;
      this.tile.style.height = `${newHeight}px`;
      this.tile.style.left = `${newX}px`;
      this.tile.style.top = `${newY}px`;
    }
  
    private onResizeUp() {
      this.isResizing = false;
      window.removeEventListener('mousemove', this.onResizeMove.bind(this));
      window.removeEventListener('mouseup', this.onResizeUp.bind(this));
    }
  
    public handleMouseLeave() {
      this.onResizeUp();
    }
  }
  