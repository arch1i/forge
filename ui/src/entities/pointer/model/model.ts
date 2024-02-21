import { createAction } from '@reduxjs/toolkit';
import { PointerPosition } from './types/core';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';

const up = createAction('pointer/up');
const down = createAction<PointerPosition>('pointer/down');
const moved = createAction<PointerPosition>('pointer/moved');

export const model = createSlice({
    name: 'pointer',
    initialState,
    reducers: {
        startDrafting: handlers.startDrafting,
        stopDrafting: handlers.stopDrafting,
    },
});

export const actions = {
    up,
    down,
    moved,
    ...model.actions,
};
