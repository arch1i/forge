import {
    type MouseEvent,
    type WheelEvent,
    type TouchEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { CanvasEngine } from '~/features/canvas/canvas-engine';
import { useWindowSize } from '~/shared/lib/use-window-size';

export default function Canvas() {
    const windowSize = useWindowSize();
    const nodeRef = useRef<HTMLCanvasElement>(null);
    const [canvasEngine, setCanvasEngine] = useState<CanvasEngine>();

    useEffect(() => {
        const canvas = nodeRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context || canvasEngine) return;
        setCanvasEngine(
            new CanvasEngine({
                canvas: canvas,
                context: context,
            }),
        );
    }, [nodeRef.current]);

    useEffect(() => {
        if (!canvasEngine || !nodeRef.current) return;
        const handleWheelEvent = (event: globalThis.WheelEvent) => {
            event.preventDefault();
            canvasEngine?.consumeWheelEvent(event as any as WheelEvent);
        };

        nodeRef.current?.addEventListener('wheel', handleWheelEvent, {
            passive: false,
        });
        return () => nodeRef.current?.removeEventListener('wheel', handleWheelEvent);
    }, [canvasEngine]);

    const handleMouseEvent = (event: MouseEvent) => {
        event.preventDefault();
        // canvasEngine?.consumeMouseEvent(event);
    };

    const handleTouchEvent = (event: TouchEvent) => {
        event.preventDefault();
        canvasEngine?.consumeTouchEvent(event);
    };

    return (
        <canvas
            ref={nodeRef}
            /*
             * canvas-engine will make it visible after initialization
             * * * */
            hidden={true}
            /*
             * mouse handlers
             * * * */
            onMouseDown={handleMouseEvent}
            onMouseMove={handleMouseEvent}
            onMouseUp={handleMouseEvent}
            /*
             * touch handlers
             * * * */
            onTouchStart={handleTouchEvent}
            onTouchMove={handleTouchEvent}
            onTouchEnd={handleTouchEvent}
            /*
             * visual properties
             * * * */
            width={windowSize.width * 2}
            height={windowSize.height * 2}
            style={{
                touchAction: 'none',
                overflow: 'hidden',
                width: `${windowSize.width * 2}px`,
                height: `${windowSize.height * 2}px`,
            }}
        />
    );
}
