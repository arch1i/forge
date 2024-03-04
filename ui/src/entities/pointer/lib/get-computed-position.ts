import { type TouchList } from 'react';
import { type ComputedPointerPosition } from '../model/types/core';

export function getComputedPosition(position: {
    targetRect: DOMRect;
    clientX: number;
    clientY: number;
    scale: number;
}): ComputedPointerPosition {
    const { clientX, clientY, targetRect, scale } = position;
    return {
        computedX: (clientX - targetRect.x) / scale,
        computedY: (clientY - targetRect.y) / scale,
    };
}

export function getComputedTouchPositions({
    targetRect,
    touches,
    scale,
}: {
    targetRect: DOMRect;
    touches: TouchList;
    scale: number;
}): Array<ComputedPointerPosition> {
    const computedPositions: Array<ComputedPointerPosition> = [];

    for (let i = 0; i < touches.length; i++) {
        const { clientX, clientY } = touches[i];
        if (isNaN(clientX) || isNaN(clientY)) continue;

        computedPositions.push(getComputedPosition({ targetRect, clientX, clientY, scale }));
    }

    return computedPositions;
}
