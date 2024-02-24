import { type TouchEventHandler, useRef, MouseEventHandler } from 'react';
import { useAppDispatch } from '~/app/store/hooks';
import { boardModel, Element, getCursorStyle } from '~/entities/board';
import {
    getComputedPosition,
    getComputedTouchPositions,
    isMainButtonPressed,
    pointerModel,
} from '~/entities/pointer';

export const Board = () => {
    const dispatch = useAppDispatch();
    const nodeRef = useRef<HTMLDivElement | null>(null);

    const draftingMode = pointerModel.selectors.useDraftingMode();
    const elements = boardModel.subscribes.useElements();

    // surface handlers
    const handleTouchStart: TouchEventHandler = (ev) => {
        ev.stopPropagation();

        const boardRect = ev.currentTarget.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({ targetRect: boardRect, touches: ev.touches });

        dispatch(pointerModel.actions.down({ touchPoints }));
    };

    const handleTouchEnd: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(pointerModel.actions.up());
    };

    const handleTouchMove: TouchEventHandler = (ev) => {
        ev.stopPropagation();

        const boardRect = ev.currentTarget.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({ targetRect: boardRect, touches: ev.touches });

        dispatch(pointerModel.actions.moved({ touchPoints }));
    };

    // mouse handlers
    const handleMouseDown: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        if (!isMainButtonPressed(ev)) return;

        const boardRect = ev.currentTarget.getBoundingClientRect();
        const keyPoint = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
        });

        dispatch(pointerModel.actions.down({ touchPoints: [keyPoint] }));
    };

    const handleMouseUp: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(pointerModel.actions.up());
    };

    const handleMouseMove: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        const boardRect = ev.currentTarget.getBoundingClientRect();
        const keyPoint = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
        });

        dispatch(pointerModel.actions.moved({ touchPoints: [keyPoint] }));
    };

    return (
        <div
            // desktop events
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            // surface events
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            // wheel event
            // onWheel={handleWheel}
            // styling
            className='relative m-16 w-[300px] h-[300px] overflow-hidden touch-none border-2 border-red-300'
            style={{
                cursor: getCursorStyle({ element: 'board', draftingMode }),
            }}
            ref={nodeRef}
        >
            {elements.map((params) => (
                <Element boardNodeRef={nodeRef} params={params} />
            ))}
        </div>
    );
};
