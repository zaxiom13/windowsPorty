import { tileManager } from './TileManager.ts';
import { calculateWindowPosition, constrainWindowPosition, calculateResizedDimensions } from '../utils/windowUtils';
import Victor from 'victor';

export class Tile {
    private tile: HTMLDivElement;
    private desktop: HTMLDivElement;
    private isDragging = false;
    private isResizing = false;
    private startPos = new Victor(0, 0);
    private initialPos = new Victor(0, 0);
    private initialSize = new Victor(0, 0);
    private resizeDirection = '';
    private onFocus: () => void;

    constructor(tile: HTMLDivElement, desktop: HTMLDivElement, onFocus: () => void) {
        this.tile = tile;
        this.desktop = desktop;
        this.onFocus = onFocus;
        tileManager.registerTile(this.tile);
        this.initializeEventListeners();

        const initialPos = calculateWindowPosition(this.desktop, new Victor(this.tile.clientWidth, this.tile.clientHeight));
        this.tile.style.left = `${initialPos.x}px`;
        this.tile.style.top = `${initialPos.y}px`;
    }

    private initializeEventListeners() {
        this.tile.addEventListener('mousedown', this.onMouseDown.bind(this));
    }

    public startDragging(event: MouseEvent) {
        this.isDragging = true;
        this.startPos = new Victor(event.clientX, event.clientY);
        this.initialPos = new Victor(this.tile.offsetLeft, this.tile.offsetTop);

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
            this.startPos = new Victor(event.clientX, event.clientY);
            this.initialSize = new Victor(this.tile.clientWidth, this.tile.clientHeight);
            this.initialPos = new Victor(this.tile.offsetLeft, this.tile.offsetTop);
            this.resizeDirection = target.dataset.direction as string;

            window.addEventListener('mousemove', this.onMouseMove.bind(this));
            window.addEventListener('mouseup', this.onMouseUp.bind(this));
            event.preventDefault();
        }
    }

    private onMouseMove(event: MouseEvent) {
        const currentPos = new Victor(event.clientX, event.clientY);
        const delta = currentPos.clone().subtract(this.startPos);

        if (this.isDragging) {
            this.handleDragging(delta);
        } else if (this.isResizing) {
            this.handleResizing(delta);
        }
    }

    private handleDragging(delta: Victor) {
        const newPos = this.initialPos.clone().add(delta);
        const constrainedPos = constrainWindowPosition(newPos, new Victor(this.tile.clientWidth, this.tile.clientHeight), this.desktop);

        this.tile.style.left = `${constrainedPos.x}px`;
        this.tile.style.top = `${constrainedPos.y}px`;
    }

    private handleResizing(delta: Victor) {
        const { newSize, newPos } = calculateResizedDimensions(
            this.resizeDirection,
            this.startPos,
            this.initialSize,
            this.initialPos,
            delta,
            this.desktop
        );

        this.tile.style.width = `${newSize.x}px`;
        this.tile.style.height = `${newSize.y}px`;
        this.tile.style.left = `${newPos.x}px`;
        this.tile.style.top = `${newPos.y}px`;
    }

    private onMouseUp() {
        this.isDragging = false;
        this.isResizing = false;
        window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        window.removeEventListener('mouseup', this.onMouseUp.bind(this));
    }
}
