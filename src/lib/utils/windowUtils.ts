// src/lib/utils/windowUtils.ts

export function calculateWindowPosition(desktop: HTMLElement, width: number, height: number) {
    const desktopRect = desktop.getBoundingClientRect();
    const maxX = desktopRect.width - width;
    const maxY = desktopRect.height - height - 28; // Subtract taskbar height
  
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
  
    return { x, y };
  }
  
  export function constrainWindowPosition(
    x: number,
    y: number,
    width: number,
    height: number,
    desktop: HTMLElement
  ) {
    const desktopRect = desktop.getBoundingClientRect();
    const maxX = desktopRect.width - width;
    const maxY = desktopRect.height - height - 28; // Subtract taskbar height
  
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  }
  
  export function calculateResizedDimensions(
    direction: string,
    startX: number,
    startY: number,
    initialWidth: number,
    initialHeight: number,
    initialX: number,
    initialY: number,
    dx: number,
    dy: number,
    desktop: HTMLElement
  ) {
    const desktopRect = desktop.getBoundingClientRect();
    const minWidth = 100;
    const minHeight = 100;
    const maxWidth = 500;
    const maxHeight = 500;
  
    let newWidth = initialWidth;
    let newHeight = initialHeight;
    let newX = initialX;
    let newY = initialY;
  
    if (direction.includes('right')) {
      newWidth = Math.min(
        Math.max(minWidth, initialWidth + dx),
        desktopRect.width - initialX,
        maxWidth
      );
    }
    if (direction.includes('bottom')) {
      newHeight = Math.min(
        Math.max(minHeight, initialHeight + dy),
        desktopRect.height - initialY - 28,
        maxHeight
      );
    }
    if (direction.includes('left')) {
      const maxLeftMove = Math.min(initialWidth - minWidth, initialX);
      const leftMove = Math.max(-maxLeftMove, Math.min(dx, initialWidth - minWidth));
      newWidth = Math.min(initialWidth - leftMove, maxWidth);
      newX = initialX + initialWidth - newWidth;
    }
    if (direction.includes('top')) {
      const maxTopMove = Math.min(initialHeight - minHeight, initialY);
      const topMove = Math.max(-maxTopMove, Math.min(dy, initialHeight - minHeight));
      newHeight = Math.min(initialHeight - topMove, maxHeight);
      newY = initialY + initialHeight - newHeight;
    }
  
    return { newWidth, newHeight, newX, newY };
  }