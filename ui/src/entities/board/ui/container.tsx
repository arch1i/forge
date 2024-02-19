import { PointerEventHandler, type ReactNode } from 'react';

interface Props {
    onPointerDown: PointerEventHandler;
    children: ReactNode;
}

export const Container = ({ onPointerDown, children }: Props) => {
    return (
        <div className='relative w-[100vw] h-[100vh] overflow-hidden' onPointerDown={onPointerDown}>
            {children}
        </div>
    );
};
