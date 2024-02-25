import { type Pointer } from '~/entities/pointer';
import { type PointerBaseEvent } from '~/entities/pointer/model/types/core';

export function isElementResizing({ pointer, event }: { pointer: Pointer; event: PointerBaseEvent }) {
    return pointer.info['drafting-an-element']?.mode === 'resizing' && event.touchPoints.length === 1;
}

export function isElementMoving({ pointer, event }: { pointer: Pointer; event: PointerBaseEvent }) {
    return pointer.info['drafting-an-element']?.mode === 'moving' && event.touchPoints.length === 1;
}

export function isDoubleTouchPoints({ event }: { pointer: Pointer; event: PointerBaseEvent }) {
    return event.touchPoints.length === 2;
}
