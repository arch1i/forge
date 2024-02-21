import { ComputedPointerPosition } from '~/shared/types/core/view';
import { PointerPosition } from '..';

export function getComputedPointerPosition(position: PointerPosition): ComputedPointerPosition {
    const { clientX, clientY, targetRect } = position;
    return {
        x: clientX - targetRect.x,
        y: clientY - targetRect.y,
    };
}
