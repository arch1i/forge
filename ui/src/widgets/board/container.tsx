import { PointerEventHandler, type ReactNode } from 'react';
import { getCursorStyle } from '~/entities/board';
import { pointerModel } from '~/entities/pointer';

interface Props {
    onPointerDown: PointerEventHandler;
    onPointerUp: PointerEventHandler;
    onPointerMove: PointerEventHandler;
    children: ReactNode;
}

export const Container = ({ onPointerDown, onPointerUp, onPointerMove, children }: Props) => {
    const draftingMode = pointerModel.selectors.useDraftingMode();

    return (
        <div
            className='relative w-[100vw] h-[100vh] overflow-hidden'
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            style={{ cursor: getCursorStyle({ element: 'board', draftingMode }) }}
        >
            {children}
        </div>
    );
};
