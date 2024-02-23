import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';
import { type PointerBaseEvent } from './types/core';

const up = createAction('pointer/up');
const down = createAction<PointerBaseEvent>('pointer/down');
const moved = createAction<PointerBaseEvent>('pointer/moved');

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
