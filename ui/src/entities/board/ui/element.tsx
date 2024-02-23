import { useAppDispatch } from '~/app/store/hooks';
import { getComputedPosition, pointerModel } from '~/entities/pointer';
import { type Element as ElementInterface } from '../model/types/element';
import { TouchEventHandler, type MouseEventHandler, type RefObject } from 'react';
import { getCursorStyle } from '../lib/get-cursor-style';

interface Params extends ElementInterface {
    boardNodeRef: RefObject<HTMLDivElement>;
}

export const Element = ({ position, size, uniqueKey, type, boardNodeRef }: Params) => {
    const dispatch = useAppDispatch();
    const draftingMode = pointerModel.selectors.useDraftingMode();

    const handleMouseDrag: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        if (!boardNodeRef?.current) return;

        const computedPointerPosition = getComputedPosition({
            clientX: ev.clientX,
            clientY: ev.clientY,
            targetRect: boardNodeRef.current.getBoundingClientRect(),
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
        if (!boardNodeRef?.current) return;

        const computedPointerPosition = getComputedPosition({
            clientX: ev.touches[0].clientX,
            clientY: ev.touches[0].clientY,
            targetRect: boardNodeRef.current.getBoundingClientRect(),
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
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: getCursorStyle({ element: type, draftingMode }),
            }}
            className='rounded-[20px] border-2 border-[#366fbc]'
        />
    );
};
