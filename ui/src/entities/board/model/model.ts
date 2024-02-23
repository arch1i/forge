import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';
import { on } from '~/app/store/middleware';
import { pointerModel } from '~/entities/pointer';

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
    effect: ({ payload: event }, { dispatch, getState }) => {
        const { pointer } = getState();
        const uniqueKey = crypto.randomUUID();
        const keyTouchPosition = event.touchPoints[0];

        if (event.touchPoints.length === 1) {
            dispatch(
                model.actions.createElement({
                    pointer,
                    computedPosition: keyTouchPosition,
                    uniqueKey,
                }),
            );
            dispatch(
                pointerModel.actions.startDrafting({
                    initialPointerPosition: keyTouchPosition,
                    uniqueKey,
                    draftingMode: 'resizing',
                }),
            );
        }
    },
});

on({
    actionCreator: pointerModel.actions.moved,
    effect: ({ payload: event }, { dispatch, getState }) => {
        if (event.touchPoints.length > 1) return;

        const { pointer } = getState();
        const keyTouchPosition = event.touchPoints[0];

        if (pointer.info['drafting-an-element']?.mode === 'resizing') {
            dispatch(model.actions.resizeElement({ computedPosition: keyTouchPosition, pointer }));
        } else if (pointer.info['drafting-an-element']?.mode === 'moving') {
            console.log('here');
            dispatch(model.actions.moveElement({ computedPosition: keyTouchPosition, pointer }));
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
