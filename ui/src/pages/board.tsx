import { useEffect, useRef } from 'react';
import { Board } from '~/widgets/board';

export default function BoardPage() {
    const ref = useRef<HTMLCanvasElement>(null);
    const ctx = ref.current?.getContext('2d');

    const draw = () => {
        if (ref.current) {
            ctx?.fillRect(50, 50, 50, 50);
        }
    };

    const translate = () => {
        ctx?.clearRect(50, 50, 50, 50);
        ctx?.translate(20, 20);
        draw();
    };

    useEffect(() => {
        draw();
    }, []);

    return (
        <canvas
            // onMouseDown={translate}
            // onMouseMove={translate}
            ref={ref}
            width={3000}
            height={3000}
            className='border border-red-500 relative'
        >
            <Board />
        </canvas>
    );
}
