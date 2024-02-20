import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';
import { on } from '~/app/store/middleware';
import { getComputedPointerPosition, pointerModel } from '~/entities/pointer';

export const model = createSlice({
    name: 'board',
    initialState,
    reducers: {
        createElement: handlers.createElement,
        resizeElement: handlers.resizeElement,
        validateElement: handlers.validateElement,

        reset: handlers.reset,
    },
});

on({
    actionCreator: pointerModel.actions.down,
    effect: ({ payload: position }, { dispatch, getState }) => {
        const { pointer } = getState();
        const computedPosition = getComputedPointerPosition(position);
        const uniqueKey = crypto.randomUUID();

        dispatch(model.actions.createElement({ pointer, computedPosition, uniqueKey }));
        dispatch(pointerModel.actions.startDrafting({ computedPosition, uniqueKey }));
    },
});

on({
    actionCreator: pointerModel.actions.moved,
    effect: ({ payload: position }, { dispatch, getState }) => {
        const { pointer } = getState();

        if (pointer.status === 'drafting-an-element') {
            const computedPosition = getComputedPointerPosition(position);
            dispatch(model.actions.resizeElement({ computedPosition, pointer }));
        }
    },
});

on({
    actionCreator: pointerModel.actions.up,
    effect: (_, { dispatch, getState }) => {
        const { pointer } = getState();

        dispatch(
            model.actions.validateElement({
                elementKey: pointer.state['drafting-an-element']?.elementKey,
            }),
        );

        dispatch(pointerModel.actions.stopDrafting());
    },
});
