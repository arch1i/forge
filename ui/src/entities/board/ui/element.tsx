import { useAppDispatch } from '~/app/store/hooks';
import { pointerModel } from '~/entities/pointer';
import { type Element as ElementInterface } from '../model/types/element';
import { type MouseEventHandler } from 'react';
import { getCursorStyle } from '../lib/get-cursor-style';

interface Params extends ElementInterface {}

export const Element = ({ position, size, uniqueKey, type }: Params) => {
    const dispatch = useAppDispatch();
    const draftingMode = pointerModel.selectors.useDraftingMode();

    const handleDrag: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(
            pointerModel.actions.startDrafting({
                uniqueKey,
                initialElementPosition: position,
                initialPointerPosition: {
                    x: ev.clientX,
                    y: ev.clientY,
                },
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
