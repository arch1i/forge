import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ModelState } from './types';
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

        clicked(state, action: PayloadAction<MouseEvent>) {
            const { clientX, clientY } = action.payload;
            state.shapes.push({
                position: {
                    x: clientX,
                    y: clientY,
                },
                size: {
                    width: 50,
                    height: 50,
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
