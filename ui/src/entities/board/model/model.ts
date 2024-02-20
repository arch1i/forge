import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';

export const boardModel = createSlice({
    name: 'board',
    initialState,
    reducers: {
        pointerDown: handlers.pointerDown,
        pointerUp: handlers.pointerUp,
        pointerPositionChanged: handlers.pointerPositionChanged,
        reset: handlers.reset,
    },
});

export const events = boardModel.actions;

export const kernel = {
    name: boardModel.name,
    reducer: boardModel.reducer,
} satisfies TypeOfValue<Model, 'kernel'>;
