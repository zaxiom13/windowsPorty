import { tileManager } from './TileManager.ts';
import { 
  calculateWindowPosition, 
  constrainWindowPosition, 
  calculateResizedDimensions 
} from '../utils/windowUtils';


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

        const { x, y } = calculateWindowPosition(this.desktop, this.tile.clientWidth, this.tile.clientHeight);
        this.tile.style.left = `${x}px`;
        this.tile.style.top = `${y}px`;
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

        const { x: newX, y: newY } = constrainWindowPosition(
            this.initialX + dx,
            this.initialY + dy,
            this.tile.clientWidth,
            this.tile.clientHeight,
            this.desktop
        );

        this.tile.style.left = `${newX}px`;
        this.tile.style.top = `${newY}px`;
    }

    private handleResizing(event: MouseEvent) {
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;

        const { newWidth, newHeight, newX, newY } = calculateResizedDimensions(
            this.resizeDirection,
            this.startX,
            this.startY,
            this.initialWidth,
            this.initialHeight,
            this.initialX,
            this.initialY,
            dx,
            dy,
            this.desktop
        );

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