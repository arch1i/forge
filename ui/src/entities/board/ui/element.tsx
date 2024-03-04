import { useAppDispatch } from '~/app/store/hooks';
import { getComputedPosition, isMainButtonPressed, pointerModel } from '~/entities/pointer';
import { getCursorStyle } from '../lib/get-cursor-style';
import { type TouchEventHandler, type MouseEventHandler, type RefObject } from 'react';
import { type Element as ElementInterface } from '../model/types/element';

interface Params {
    boardNodeRef: RefObject<HTMLDivElement>;
    params: ElementInterface;
    scale: number;
}

export const Element = ({ boardNodeRef, params, scale }: Params) => {
    const dispatch = useAppDispatch();
    const { position, size, uniqueKey, type } = params;

    const draftingMode = pointerModel.selectors.useDraftingMode();

    const handleMouseDrag: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        if (!boardNodeRef?.current || !isMainButtonPressed(ev)) return;

        const computedPointerPosition = getComputedPosition({
            clientX: ev.clientX,
            clientY: ev.clientY,
            targetRect: boardNodeRef.current.getBoundingClientRect(),
            scale,
        });

        dispatch(
            pointerModel.actions.startDrafting({
                uniqueKey,
                initialElementPosition: position,
                initialPointerPosition: computedPointerPosition,
                draftingMode: 'moving',
            }),
        );
    };

    const handleTouchDrag: TouchEventHandler = (ev) => {
        ev.stopPropagation();
        if (!boardNodeRef?.current || ev.touches.length > 1) return;

        const computedPointerPosition = getComputedPosition({
            clientX: ev.touches[0].clientX,
            clientY: ev.touches[0].clientY,
            targetRect: boardNodeRef.current.getBoundingClientRect(),
            scale,
        });

        dispatch(
            pointerModel.actions.startDrafting({
                uniqueKey,
                initialElementPosition: position,
                initialPointerPosition: computedPointerPosition,
                draftingMode: 'moving',
            }),
        );
    };

    return (
        <div
            onMouseDown={handleMouseDrag}
            onTouchStart={handleTouchDrag}
            style={{
                position: 'absolute',
                top: `${position.computedY}px`,
                left: `${position.computedX}px`,
                width: `${size.width * scale}px`,
                height: `${size.height * scale}px`,
                cursor: getCursorStyle({ element: type, draftingMode }),
            }}
            className='rounded-[10px] border-2 border-[#366fbc] text-center overflow-hidden flex items-center justify-center'
        >
            <span className='text-blue-900'>placeholder</span>
        </div>
    );
};
