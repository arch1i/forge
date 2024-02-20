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
        moveElement: handlers.moveElement,
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
        dispatch(
            pointerModel.actions.startDrafting({
                computedPosition,
                uniqueKey,
                draftingMode: 'resizing',
            }),
        );
    },
});

on({
    actionCreator: pointerModel.actions.moved,
    effect: ({ payload: position }, { dispatch, getState }) => {
        const { pointer } = getState();
        const computedPosition = getComputedPointerPosition(position);

        if (pointer.info['drafting-an-element']?.mode === 'resizing') {
            dispatch(model.actions.resizeElement({ computedPosition, pointer }));
        }
        if (pointer.info['drafting-an-element']?.mode === 'moving') {
            dispatch(model.actions.moveElement({ computedPosition, pointer }));
        }
    },
});

on({
    actionCreator: pointerModel.actions.up,
    effect: (_, { dispatch, getState }) => {
        const { pointer } = getState();

        dispatch(
            model.actions.validateElement({
                elementKey: pointer.info['drafting-an-element']?.elementKey,
            }),
        );
        dispatch(pointerModel.actions.stopDrafting());
    },
});
