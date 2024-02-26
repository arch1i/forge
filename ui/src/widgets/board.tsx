import { type TouchEventHandler, useRef, MouseEventHandler, useEffect } from 'react';
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
    const scale = boardModel.subscribes.useScale();

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
        const { computedX, computedY } = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
        });

        dispatch(
            pointerModel.actions.down({
                touchPoints: [
                    {
                        computedX: computedX / scale,
                        computedY: computedY / scale,
                    },
                ],
            }),
        );
    };

    const handleMouseUp: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(pointerModel.actions.up());
    };

    const handleMouseMove: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        const boardRect = ev.currentTarget.getBoundingClientRect();
        const { computedX, computedY } = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
        });

        dispatch(
            pointerModel.actions.moved({
                touchPoints: [
                    {
                        computedX: computedX / scale,
                        computedY: computedY / scale,
                    },
                ],
            }),
        );
    };

    useEffect(() => {
        // send desktop scale event
        const handleWheel = (ev: WheelEvent) => {
            ev.preventDefault();
            // if (ev.ctrlKey) {
            //     setScale((prev) => {
            //         if (prev <= 1 && ev.deltaY > 0) return prev;
            //         const newScale = prev - ev.deltaY * 0.003;
            //         return newScale < 1 ? 1 : newScale;
            //     });
            // }
        };
        nodeRef.current?.addEventListener('wheel', handleWheel, { passive: false });
        return () => nodeRef.current?.removeEventListener('wheel', handleWheel);
    }, []);

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
            // styling
            className='relative w-[3000px] h-[3000px] overflow-hidden touch-none'
            style={{
                cursor: getCursorStyle({ element: 'board', draftingMode }),
                transform: `scale(${scale})`,
            }}
            ref={nodeRef}
        >
            {elements.map((params) => (
                <Element key={params.uniqueKey} boardNodeRef={nodeRef} params={params} />
            ))}
        </div>
    );
};
