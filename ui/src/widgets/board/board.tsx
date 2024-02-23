import { type TouchEventHandler, useRef, MouseEventHandler } from 'react';
import { useAppDispatch } from '~/app/store/hooks';
import { boardModel, Element, getCursorStyle } from '~/entities/board';
import { getComputedPosition, getComputedTouchPositions, pointerModel } from '~/entities/pointer';

export const Board = () => {
    const dispatch = useAppDispatch();
    const nodeRef = useRef<HTMLDivElement | null>(null);

    const draftingMode = pointerModel.selectors.useDraftingMode();
    const elements = boardModel.subscribes.useElements();

    // surface handlers
    const handleTouchStart: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        if (!nodeRef.current) return;

        const boardRect = nodeRef.current?.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({ targetRect: boardRect, touches: ev.touches });

        dispatch(pointerModel.actions.down({ touchPoints }));
    };

    const handleTouchEnd: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(pointerModel.actions.up());
    };

    const handleTouchMove: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        if (!nodeRef.current) return;

        const boardRect = nodeRef.current.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({ targetRect: boardRect, touches: ev.touches });

        dispatch(pointerModel.actions.moved({ touchPoints }));
    };

    // mouse handlers
    const handleMouseDown: MouseEventHandler = (ev) => {
        ev.stopPropagation();
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
            className='relative w-[100vw] h-[100vh] overflow-hidden touch-none'
            style={{ cursor: getCursorStyle({ element: 'board', draftingMode }) }}
            ref={nodeRef}
        >
            {elements.map((el) => {
                return (
                    <Element
                        boardNodeRef={nodeRef}
                        key={el.uniqueKey}
                        uniqueKey={el.uniqueKey}
                        type={el.type}
                        position={el.position}
                        size={el.size}
                        styles={el.styles}
                    />
                );
            })}
        </div>
    );
};
