import { type TouchList } from 'react';
import { type ComputedPointerPosition } from '../model/types/core';

export function getComputedPosition(position: {
    targetRect: DOMRect;
    clientX: number;
    clientY: number;
}): ComputedPointerPosition {
    const { clientX, clientY, targetRect } = position;
    return {
        computedX: clientX - targetRect.x,
        computedY: clientY - targetRect.y,
    };
}

export function getComputedTouchPositions({
    targetRect,
    touches,
}: {
    targetRect: DOMRect;
    touches: TouchList;
}): Array<ComputedPointerPosition> {
    const computedPositions: Array<ComputedPointerPosition> = [];

    for (let i = 0; i < touches.length; i++) {
        const { clientX, clientY } = touches[i];
        if (isNaN(clientX) || isNaN(clientY)) continue;

        computedPositions.push(getComputedPosition({ targetRect, clientX, clientY }));
    }

    return computedPositions;
}
