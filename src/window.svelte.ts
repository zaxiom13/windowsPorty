// src/page.ts
let isDragging = false;
let isResizing = false;
let startX: number, startY: number, initialX: number, initialY: number, initialWidth: number, initialHeight: number;
let tile: HTMLDivElement;
let desktop: HTMLDivElement;
let resizeDirection: string;

export function setTileElement(element: HTMLDivElement) {
  tile = element;
}

export function setDesktopElement(element: HTMLDivElement) {
  desktop = element;
}

export function onMouseDown(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (target.classList.contains('titlebar')) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    initialX = tile.offsetLeft;
    initialY = tile.offsetTop;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    event.preventDefault();
  } else if (target.classList.contains('resize-handle')) {
    isResizing = true;
    startX = event.clientX;
    startY = event.clientY;
    initialWidth = tile.clientWidth;
    initialHeight = tile.clientHeight;
    initialX = tile.offsetLeft;
    initialY = tile.offsetTop;
    resizeDirection = target.dataset.direction as string;

    window.addEventListener('mousemove', onResizeMove);
    window.addEventListener('mouseup', onResizeUp);
    event.preventDefault();
  }
}

export function onMouseMove(event: MouseEvent) {
  if (!isDragging) return;

  const dx = event.clientX - startX;
  const dy = event.clientY - startY;

  let newX = initialX + dx;
  let newY = initialY + dy;

  // Boundary conditions
  const rect = desktop.getBoundingClientRect();
  const tileRect = tile.getBoundingClientRect();

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX + tileRect.width > rect.width) newX = rect.width - tileRect.width;
  if (newY + tileRect.height > rect.height) newY = rect.height - tileRect.height;

  tile.style.left = `${newX}px`;
  tile.style.top = `${newY}px`;
}

export function onMouseUp() {
  isDragging = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

export function onResizeMove(event: MouseEvent) {
  if (!isResizing) return;

  const dx = event.clientX - startX;
  const dy = event.clientY - startY;

  if (resizeDirection.includes('right')) {
    tile.style.width = `${initialWidth + dx}px`;
  }
  if (resizeDirection.includes('bottom')) {
    tile.style.height = `${initialHeight + dy}px`;
  }
  if (resizeDirection.includes('left')) {
    tile.style.width = `${initialWidth - dx}px`;
    tile.style.left = `${initialX + dx}px`;
  }
  if (resizeDirection.includes('top')) {
    tile.style.height = `${initialHeight - dy}px`;
    tile.style.top = `${initialY + dy}px`;
  }
}

export function onResizeUp() {
  isResizing = false;
  window.removeEventListener('mousemove', onResizeMove);
  window.removeEventListener('mouseup', onResizeUp);
}


export const handleMouseLeave = () => {
  //onMouseUp();
  onResizeUp();
};