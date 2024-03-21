import { type WheelEvent, type TouchEvent, type TouchList } from 'react';
import { getTranslateDir } from './lib/get-translate-dir';

export class CanvasEngine {
    constructor({ canvas, context }: CanvasEngineOptions) {
        this.canvas = canvas;
        this.context = context;
        this.canvas.hidden = false;

        this.shapes = this.getRandomRects();
        this.draw();
    }

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private scaleValue: number = 1;
    private shapes: Array<any>;
    private pointer: Pointer = { mode: 'idle', info: {} };

    // consumeMouseEvent(event: MouseEvent) {}

    consumeTouchEvent(event: TouchEvent) {
        if (event.type === 'touchstart') {
            this.pointer.mode = 'translation';
        }

        if (event.type === 'touchmove') {
            if (this.pointer.mode === 'translation' && event.touches.length === 1) {
                const { clientX, clientY } = event.touches[0];
                const prevPoint = this.pointer.info.translation?.prevPoints?.[0];

                this.translate(
                    getTranslateDir.byTouch({ currentPoint: { x: clientX, y: clientY }, prevPoint }),
                );

                this.pointer.info.translation = {
                    prevPoints: getPointsPosition({ touches: event.touches }),
                };
            }
        }

        if (event.type === 'touchend') {
            this.resetPointer();
        }
    }

    consumeWheelEvent(event: WheelEvent) {
        if (event.ctrlKey) {
            this.scale(event);
        }
        this.translate(getTranslateDir.byWheel(event));
    }

    private translate({ x, y }: { x: number; y: number }) {
        this.context.translate(x, y);
        this.draw();
    }

    private scale(ev: WheelEvent) {
        const value = this.scaleValue - ev.deltaY * 0.01;
        this.scaleValue = value < 1 ? 1 : value;
        this.draw();
    }

    private resetPointer() {
        this.pointer.mode = 'idle';
        this.pointer.info.translation = undefined;
    }

    private draw() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.shapes.forEach((shape) => {
            this.context.save();
            this.context.scale(this.scaleValue, this.scaleValue);

            this.context.fillStyle = shape.color;
            this.context.fillRect(
                shape.x * (1 / 5),
                shape.y * (1 / 5),
                shape.width * (1 / 5),
                shape.height * (1 / 5),
            );

            this.context.restore();
        });
    }

    private getRandomRects() {
        const arr = [];
        for (let i = 0; i < 4; i++) {
            const x = Math.floor(Math.random() * (this.context.canvas.width - 150));
            const y = Math.floor(Math.random() * (this.context.canvas.height - 150));
            const width = Math.floor(Math.random() * 100) + 50;
            const height = Math.floor(Math.random() * 100) + 50;
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            arr.push({ color, x, y, width, height });
        }
        return arr;
    }
}

interface CanvasEngineOptions {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}

interface Pointer {
    mode: 'idle' | 'translation';

    info: {
        translation?: {
            initialPoints?: Array<Position>;
            prevPoints?: Array<Position>;
        };
    };
}

export interface Position {
    x: number;
    y: number;
}

function getPointsPosition({ touches }: { touches: TouchList }): Array<Position> {
    const points: Array<Position> = [];
    for (let i = 0; i < touches.length; i++) {
        const { clientX, clientY } = touches[i];
        if (isNaN(clientX) || isNaN(clientY)) continue;

        points.push({ x: clientX, y: clientY });
    }
    return points;
}
