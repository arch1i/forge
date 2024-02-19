import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ModelState } from './types/state';
import { type MouseEvent } from 'react';

const initialState: ModelState = {
    shapes: [],
};

export const boardModel = createSlice({
    name: 'board',
    initialState,
    reducers: {
        reset() {
            return initialState;
        },

        pointerDown(
            state,
            action: PayloadAction<
                Pick<MouseEvent, 'clientX' | 'clientY'> & {
                    currentTargetRect: Pick<DOMRect, 'x' | 'y'>;
                }
            >,
        ) {
            const { clientX, clientY, currentTargetRect } = action.payload;
            state.shapes.push({
                uniqueKey: crypto.randomUUID(),
                position: {
                    x: clientX - currentTargetRect.x,
                    y: clientY - currentTargetRect.y,
                },
                size: {
                    width: 40,
                    height: 40,
                },
                type: 'rect',
                styles: {
                    color: 'cyan',
                },
            });
        },
    },
});

export const events = boardModel.actions;

export const kernel = {
    name: boardModel.name,
    reducer: boardModel.reducer,
} satisfies TypeOfValue<Model, 'kernel'>;
