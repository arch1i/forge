import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ModelState } from './types/state';
import { type MouseEvent } from 'react';
import { isElementValid } from '../lib/is-element-valid';

const initialState: ModelState = {
    shapes: [],
    pointer: {
        status: 'idle',
    },
};

export const boardModel = createSlice({
    name: 'board',
    initialState,
    reducers: {
        pointerDown(
            state,
            action: PayloadAction<
                Pick<MouseEvent, 'clientX' | 'clientY'> & {
                    currentTargetRect: Pick<DOMRect, 'x' | 'y'>;
                }
            >,
        ) {
            const { clientX, clientY, currentTargetRect } = action.payload;
            const computed = {
                x: clientX - currentTargetRect.x,
                y: clientY - currentTargetRect.y,
            };

            const uniqueKey = crypto.randomUUID();

            state.shapes.push({
                uniqueKey,
                position: {
                    x: computed.x,
                    y: computed.y,
                },
                size: {
                    width: 1,
                    height: 1,
                },
                type: 'rect',
                styles: {
                    color: 'cyan',
                },
            });
            state.pointer = {
                status: 'drafting-an-element',
                drafting: {
                    elementKey: uniqueKey,
                    initialComputedPosition: {
                        x: computed.x,
                        y: computed.y,
                    },
                },
            };
        },

        pointerUp(state) {
            const { shapes, pointer } = state;
            const key = pointer.drafting?.elementKey;
            const index = shapes.findIndex((el) => el.uniqueKey === key);
            const draftedElement = shapes[index];

            if (!isElementValid(draftedElement)) {
                shapes.splice(index, 1);
            }

            state.pointer = {
                status: 'idle',
                drafting: undefined,
            };
        },

        pointerPositionChanged(
            state,
            action: PayloadAction<
                Pick<MouseEvent, 'clientX' | 'clientY'> & {
                    currentTargetRect: Pick<DOMRect, 'x' | 'y'>;
                }
            >,
        ) {
            const { pointer, shapes } = state;
            const { clientX, clientY, currentTargetRect } = action.payload;

            if (pointer.status === 'drafting-an-element' && pointer.drafting) {
                const key = pointer.drafting?.elementKey;
                const element = shapes.find((el) => el.uniqueKey === key);
                const { x: initX, y: initY } = pointer.drafting.initialComputedPosition;

                const computed = {
                    x: clientX - currentTargetRect.x,
                    y: clientY - currentTargetRect.y,
                };

                if (isNaN(initX) || isNaN(initY) || !element) return;

                element.size = {
                    width: Math.abs(initX - computed.x),
                    height: Math.abs(initY - computed.y),
                };

                element.position = {
                    x: initX < computed.x ? element.position.x : computed.x,
                    y: initY < computed.y ? element.position.y : computed.y,
                };
            }
        },

        reset() {
            return initialState;
        },
    },
});

export const events = boardModel.actions;

export const kernel = {
    name: boardModel.name,
    reducer: boardModel.reducer,
} satisfies TypeOfValue<Model, 'kernel'>;
