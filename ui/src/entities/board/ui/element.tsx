import { useAppDispatch } from '~/app/store/hooks';
import { pointerModel } from '~/entities/pointer';
import { type Element as ElementInterface } from '../model/types/element';
import { type MouseEventHandler } from 'react';

interface Params extends ElementInterface {}

export const Element = ({ position, size, uniqueKey }: Params) => {
    const dispatch = useAppDispatch();
    const pointer = pointerModel.selectors.usePointerStatus();

    const handleDrag: MouseEventHandler = (ev) => {
        ev.stopPropagation();
        dispatch(
            pointerModel.actions.elementDragged({
                uniqueKey,
                initialElementPosition: position,
                initialPointerPosition: {
                    x: ev.clientX,
                    y: ev.clientY,
                },
            }),
        );
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: pointer === 'drafting-an-element' ? 'crosshair' : 'grab',
            }}
            onPointerDown={handleDrag}
            className='rounded-[20px] border-2 border-[#366fbc]'
        />
    );
};
