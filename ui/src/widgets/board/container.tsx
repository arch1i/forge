import { PointerEventHandler, type ReactNode } from 'react';

interface Props {
    onPointerDown: PointerEventHandler;
    onPointerUp: PointerEventHandler;
    onPointerMove: PointerEventHandler;
    children: ReactNode;
}

export const Container = ({ onPointerDown, onPointerUp, onPointerMove, children }: Props) => {
    return (
        <div
            className='relative w-[100vw] h-[100vh] overflow-hidden'
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            style={{ cursor: 'crosshair' }}
        >
            {children}
        </div>
    );
};
