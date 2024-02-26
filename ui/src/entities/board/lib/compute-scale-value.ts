import { type Pointer, type PointerBaseEvent } from '~/entities/pointer';
import { MAX_SCALE_VALUE, MIN_SCALE_VALUE, SCALE_BY_TOUCH_LEVERAGE } from '../config/constants';

interface Params {
    pointer: Pointer;
    event: PointerBaseEvent;
    prevScale: number;
}

export function computeScaleValue({ pointer, prevScale: prev, event }: Params): number {
    const lastPositions = pointer.info['modifying-board-view']?.lastTouchPoints;
    if (!lastPositions) return prev;

    const current = {
        x: Math.abs(event.touchPoints[0].computedX - event.touchPoints[1].computedX),
        y: Math.abs(event.touchPoints[0].computedY - event.touchPoints[1].computedY),
    };
    const initial = {
        x: Math.abs(lastPositions[0].computedX - lastPositions[1].computedX),
        y: Math.abs(lastPositions[0].computedY - lastPositions[1].computedY),
    };

    const currentDiffBetweenTouches = current.x + current.y;
    const initialDiffBetweenTouches = initial.x + initial.y;

    const toScale = (initialDiffBetweenTouches - currentDiffBetweenTouches) * SCALE_BY_TOUCH_LEVERAGE;
    const computed = prev - toScale;

    if (computed < MAX_SCALE_VALUE && computed > MIN_SCALE_VALUE) {
        return computed;
    } else {
        return prev;
    }
}
