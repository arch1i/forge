import { type MouseEvent } from 'react';

export function isMainButtonPressed(event: MouseEvent) {
    return event.button === 0;
}
