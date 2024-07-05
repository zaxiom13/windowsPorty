import Victor from 'victor';

export const calculateWindowPosition = (desktop: HTMLDivElement, size: Victor): Victor => {
    const desktopRect = desktop.getBoundingClientRect();
    const x = (desktopRect.width - size.x) / 2;
    const y = (desktopRect.height - size.y) / 2;
    return new Victor(x, y);
};

export const constrainWindowPosition = (
    position: Victor,
    size: Victor,
    desktop: HTMLDivElement
): Victor => {
    const desktopRect = desktop.getBoundingClientRect();
    const newX = Math.max(0, Math.min(position.x, desktopRect.width - size.x));
    const newY = Math.max(0, Math.min(position.y, desktopRect.height - size.y));
    return new Victor(newX, newY);
};

export const calculateResizedDimensions = (
    resizeDirection: string,
    startPos: Victor,
    initialSize: Victor,
    initialPos: Victor,
    delta: Victor,
    desktop: HTMLDivElement
): {
    newSize: Victor;
    newPos: Victor;
} => {
    const minSize = new Victor(100, 100);
    const maxSize = new Victor(500, 500);
    const desktopRect = desktop.getBoundingClientRect();

    const newSize = resizeDirection.includes('right')
        ? new Victor(initialSize.x + delta.x, initialSize.y)
        : resizeDirection.includes('left')
        ? new Victor(initialSize.x - delta.x, initialSize.y)
        : initialSize.clone();

    newSize.y = resizeDirection.includes('bottom')
        ? initialSize.y + delta.y
        : resizeDirection.includes('top')
        ? initialSize.y - delta.y
        : initialSize.y;

    const newPos = resizeDirection.includes('left')
        ? new Victor(initialPos.x + delta.x, initialPos.y)
        : initialPos.clone();

    newPos.y = resizeDirection.includes('top')
        ? initialPos.y + delta.y
        : initialPos.y;

    const constrainedSize = new Victor(
        Math.max(minSize.x, Math.min(newSize.x, maxSize.x)),
        Math.max(minSize.y, Math.min(newSize.y, maxSize.y))
    );

    const constrainedPos = constrainWindowPosition(newPos, constrainedSize, desktop);

    return {
        newSize: constrainedSize,
        newPos: constrainedPos,
    };
};