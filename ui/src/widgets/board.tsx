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
    console.log(scale);
    // surface handlers
    const handleTouchStart: TouchEventHandler = (ev) => {
        ev.stopPropagation();

        const boardRect = ev.currentTarget.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({
            targetRect: boardRect,
            touches: ev.touches,
            scale,
        });

        dispatch(pointerModel.actions.down({ touchPoints }));
    };

    const handleTouchEnd: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(pointerModel.actions.up());
    };

    const handleTouchMove: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        const boardRect = ev.currentTarget.getBoundingClientRect();
        const touchPoints = getComputedTouchPositions({
            targetRect: boardRect,
            touches: ev.touches,
            scale,
        });

        dispatch(pointerModel.actions.moved({ touchPoints }));
    };

    // mouse handlers
    const handleMouseDown: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        if (!isMainButtonPressed(ev)) return;

        const boardRect = ev.currentTarget.getBoundingClientRect();
        const keyTouchPoint = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
            scale,
        });

        dispatch(
            pointerModel.actions.down({
                touchPoints: [keyTouchPoint],
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
        const keyTouchPoint = getComputedPosition({
            targetRect: boardRect,
            clientX: ev.clientX,
            clientY: ev.clientY,
            scale,
        });

        dispatch(
            pointerModel.actions.moved({
                touchPoints: [keyTouchPoint],
            }),
        );
    };

    useEffect(() => {
        // send desktop scale event
        const handleWheel = (ev: WheelEvent) => {
            ev.preventDefault();
            if (ev.ctrlKey) {
                const newScale = scale + ev.deltaY * 0.1;
                console.log(newScale);
                boardModel.actions.changeScale({
                    newValue: newScale,
                });
            }
        };
        nodeRef.current?.addEventListener('wheel', handleWheel, { passive: false });
        return () => nodeRef.current?.removeEventListener('wheel', handleWheel);
    }, []);

    // const BOARD_SIZE = 3000; // to board model

    // const s = scale >= 1 ? scale - 1 : 1 - scale;

    // const val = nodeRef.current?.getBoundingClientRect().width * s;

    // const pos =
    //     scale <= 1
    //         ? `-${val / nodeRef.current?.getBoundingClientRect().width}px`
    //         : `${val / nodeRef.current?.getBoundingClientRect().width}px`;
    console.log(scale);
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
            className='relative w-[3000px] h-[3000px] border border-red-500 touch-none'
            style={{
                cursor: getCursorStyle({ element: 'board', draftingMode }),
                zoom: scale,
            }}
            ref={nodeRef}
        >
            {elements.map((params) => (
                <Element
                    scale={scale}
                    key={params.uniqueKey}
                    boardNodeRef={nodeRef}
                    params={params}
                />
            ))}
        </div>
    );
};
