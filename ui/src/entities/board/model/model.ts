import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';
import { on } from '~/app/store/middleware';

export const model = createSlice({
    name: 'board',
    initialState,
    reducers: {
        // move to Pointer entity
        pointerDown: handlers.pointerDown,
        pointerUp: handlers.pointerUp,
        pointerPositionChanged: handlers.pointerPositionChanged,

        // board actions
        createElement: () => {},
        resizeElement: () => {},
        moveElement: () => {},
        selectElement: () => {},

        // ----
        reset: handlers.reset,
    },
});

on({
    actionCreator: model.actions.pointerDown,
    effect: () => {
        const mode = 'rect'; // getState().pointer.mode;
        const styling = {}; // getState().pointer.styling[mode]
        const state = {}; // getState().pointer.state;
        // state = state.status; // drafting || idle;
    },
});
