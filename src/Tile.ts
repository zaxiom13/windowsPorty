import { tileManager } from './TileManager';

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
    private onFocus: () => void;

    constructor(tile: HTMLDivElement, desktop: HTMLDivElement, onFocus: () => void) {
        this.tile = tile;
        this.desktop = desktop;
        this.onFocus = onFocus;
        tileManager.registerTile(this.tile);
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        this.tile.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    public startDragging(event: MouseEvent) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.initialX = this.tile.offsetLeft;
        this.initialY = this.tile.offsetTop;

        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('mouseup', this.onMouseUp.bind(this));
        event.preventDefault();
    }

    public focus() {
        tileManager.bringToFront(this.tile);
        this.onFocus();
    }

    private onMouseDown(event: MouseEvent) {
        this.focus();
        const target = event.target as HTMLElement;
        if (target.classList.contains('resize-handle')) {
            this.isResizing = true;
            this.startX = event.clientX;
            this.startY = event.clientY;
            this.initialWidth = this.tile.clientWidth;
            this.initialHeight = this.tile.clientHeight;
            this.initialX = this.tile.offsetLeft;
            this.initialY = this.tile.offsetTop;
            this.resizeDirection = target.dataset.direction as string;

            window.addEventListener('mousemove', this.onMouseMove.bind(this));
            window.addEventListener('mouseup', this.onMouseUp.bind(this));
            event.preventDefault();
        }
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            this.handleDragging(event);
        } else if (this.isResizing) {
            this.handleResizing(event);
        }
    }

    private handleDragging(event: MouseEvent) {
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;

        let newX = this.initialX + dx;
        let newY = this.initialY + dy;

        const desktopRect = this.desktop.getBoundingClientRect();
        const tileRect = this.tile.getBoundingClientRect();

        newX = Math.max(0, Math.min(newX, desktopRect.width - tileRect.width));
        newY = Math.max(0, Math.min(newY, desktopRect.height - tileRect.height));

        this.tile.style.left = `${newX}px`;
        this.tile.style.top = `${newY}px`;
    }

    private handleResizing(event: MouseEvent) {
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;

        const desktopRect = this.desktop.getBoundingClientRect();
        const minWidth = 100;
        const minHeight = 100;
        const maxWidth = 500;
        const maxHeight = 500;

        let newWidth = this.initialWidth;
        let newHeight = this.initialHeight;
        let newX = this.initialX;
        let newY = this.initialY;

        if (this.resizeDirection.includes('right')) {
            newWidth = Math.min(
                Math.max(minWidth, this.initialWidth + dx),
                desktopRect.width - this.initialX,
                maxWidth
            );
        }
        if (this.resizeDirection.includes('bottom')) {
            newHeight = Math.min(
                Math.max(minHeight, this.initialHeight + dy),
                desktopRect.height - this.initialY,
                maxHeight
            );
        }
        if (this.resizeDirection.includes('left')) {
            const maxLeftResize = this.initialX + this.initialWidth - minWidth;
            const leftResize = Math.min(dx, maxLeftResize);
            newWidth = Math.min(
                Math.max(minWidth, this.initialWidth - leftResize),
                maxWidth,
                this.initialX + this.initialWidth
            );
            newX = Math.max(0, Math.min(this.initialX + dx, this.initialX + this.initialWidth - minWidth));
        }
        if (this.resizeDirection.includes('top')) {
            const maxTopResize = this.initialY + this.initialHeight - minHeight;
            const topResize = Math.min(dy, maxTopResize);
            newHeight = Math.min(
                Math.max(minHeight, this.initialHeight - topResize),
                maxHeight,
                this.initialY + this.initialHeight
            );
            newY = Math.max(0, Math.min(this.initialY + dy, this.initialY + this.initialHeight - minHeight));
        }

        this.tile.style.width = `${newWidth}px`;
        this.tile.style.height = `${newHeight}px`;
        this.tile.style.left = `${newX}px`;
        this.tile.style.top = `${newY}px`;
    }

    private onMouseUp() {
        this.isDragging = false;
        this.isResizing = false;
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }
}