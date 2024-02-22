import { useAppDispatch } from '~/app/store/hooks';
import { getComputedPointerPosition, pointerModel } from '~/entities/pointer';
import { type Element as ElementInterface } from '../model/types/element';
import { type MouseEventHandler, type RefObject } from 'react';
import { getCursorStyle } from '../lib/get-cursor-style';

interface Params extends ElementInterface {
    boardNodeRef: RefObject<HTMLDivElement>;
}

export const Element = ({ position, size, uniqueKey, type, boardNodeRef }: Params) => {
    const dispatch = useAppDispatch();
    const draftingMode = pointerModel.selectors.useDraftingMode();

    const handleDrag: MouseEventHandler = (ev) => {
        ev.stopPropagation();

        if (!boardNodeRef?.current) return;
        const boardRect = boardNodeRef.current?.getBoundingClientRect();
        const computedPointerPosition = getComputedPointerPosition({
            clientX: ev.clientX,
            clientY: ev.clientY,
            targetRect: {
                x: boardRect.x,
                y: boardRect.y,
            },
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
            onPointerDown={handleDrag}
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: getCursorStyle({ element: type, draftingMode }),
            }}
            className='rounded-[20px] border-2 border-[#366fbc]'
        />
    );
};
