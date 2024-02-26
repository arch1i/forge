import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initial-state';
import { handlers } from './event-handlers';
import { on } from '~/app/store/middleware';
import { pointerModel } from '~/entities/pointer';
import {
    isDoubleTouchPoints,
    isElementMoving,
    isElementResizing,
} from '../lib/pointer-move-predicates';
import { computeScaleValue } from '../lib/compute-scale-value';

export const model = createSlice({
    name: 'board',
    initialState,
    reducers: {
        createElement: handlers.createElement,
        validateAllElements: handlers.validateAllElements,

        resizeElement: handlers.resizeElement,
        moveElement: handlers.moveElement,

        changeScale: handlers.changeScale,
        reset: handlers.reset,
    },
});

on({
    actionCreator: pointerModel.actions.down,
    effect: ({ payload: event }, { dispatch, getState }) => {
        const { pointer } = getState();
        const uniqueKey = crypto.randomUUID();

        if (event.touchPoints.length === 1) {
            dispatch(
                model.actions.createElement({
                    pointer,
                    computedPosition: event.touchPoints[0],
                    uniqueKey,
                }),
            );
            dispatch(
                pointerModel.actions.startDrafting({
                    initialPointerPosition: event.touchPoints[0],
                    uniqueKey,
                    draftingMode: 'resizing',
                }),
            );
        }

        if (event.touchPoints.length === 2) {
            dispatch(
                pointerModel.actions.upsertModifyingBoardViewInfo({
                    lastTouchPoints: event.touchPoints,
                }),
            );
        }
    },
});

on({
    actionCreator: pointerModel.actions.moved,
    effect: ({ payload: event }, { dispatch, getState }) => {
        const { pointer, board } = getState();
        const keyTouchPosition = event.touchPoints[0];

        if (event.touchPoints.length > 1) {
            dispatch(model.actions.validateAllElements());
            dispatch(pointerModel.actions.stopDrafting());
        }

        if (isElementResizing({ pointer, event })) {
            dispatch(model.actions.resizeElement({ computedPosition: keyTouchPosition, pointer }));
        } else if (isElementMoving({ pointer, event })) {
            dispatch(model.actions.moveElement({ computedPosition: keyTouchPosition, pointer }));
        } else if (isDoubleTouchPoints({ pointer, event })) {
            dispatch(
                pointerModel.actions.upsertModifyingBoardViewInfo({
                    lastTouchPoints: event.touchPoints,
                }),
            );
            dispatch(
                model.actions.changeScale({
                    newValue: computeScaleValue({ event, pointer, prevScale: board.scale }),
                }),
            );
        }
    },
});

on({
    actionCreator: pointerModel.actions.up,
    effect: (_, { dispatch }) => {
        dispatch(model.actions.validateAllElements());

        dispatch(pointerModel.actions.stopDrafting());
        dispatch(pointerModel.actions.stopModifyingBoardView());
    },
});
