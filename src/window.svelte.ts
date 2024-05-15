let isDragging = false;
let startX: number, startY: number, initialX: number, initialY: number;
let tile: HTMLDivElement;
let desktop: HTMLDivElement;

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
