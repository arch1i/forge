import { type Position } from '../canvas-engine';
import { type WheelEvent } from 'react';

const byTouch = ({
    currentPoint,
    prevPoint,
}: {
    currentPoint: Position;
    prevPoint: Position | undefined;
}) => {
    return {
        x: currentPoint.x - (prevPoint?.x ?? currentPoint.x),
        y: currentPoint.y - (prevPoint?.y ?? currentPoint.y),
    };
};

const byWheel = (event: WheelEvent) => {
    return {
        x: -event.deltaX,
        y: -event.deltaY,
    };
};

export const getTranslateDir = {
    byTouch,
    byWheel,
};
