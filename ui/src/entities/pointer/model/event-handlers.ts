import { type CaseReducer, type PayloadAction } from '@reduxjs/toolkit';
import { type DraftingMode, type Pointer } from './types/state';
import { type ComputedPointerPosition } from './types/core';

const startDrafting: CaseReducer<
    Pointer,
    PayloadAction<{
        uniqueKey: UniqueKey;
        draftingMode: DraftingMode;
        initialPointerPosition?: ComputedPointerPosition;
        initialElementPosition?: ComputedPointerPosition;
    }>
> = (state, action) => {
    const { uniqueKey, initialPointerPosition, draftingMode, initialElementPosition } =
        action.payload;
    state.status = 'drafting-an-element';
    state.info['drafting-an-element'] = {
        mode: draftingMode,
        elementKey: uniqueKey,
        initialPointerPosition,
        initialElementPosition,
    };
};

const stopDrafting: CaseReducer<Pointer> = (state) => {
    state.status = 'idle';
    state.info['drafting-an-element'] = undefined;
};

const upsertModifyingBoardViewInfo: CaseReducer<
    Pointer,
    PayloadAction<{
        lastTouchPoints?: Array<ComputedPointerPosition>;
    }>
> = (state, action) => {
    const { lastTouchPoints } = action.payload;
    state.status = 'modifying-board-view';
    state.info['modifying-board-view'] = {
        lastTouchPoints,
    };
};

const stopModifyingBoardView: CaseReducer<Pointer> = (state) => {
    state.status = 'idle';
    state.info['modifying-board-view'] = undefined;
};

export const handlers = {
    startDrafting,
    stopDrafting,

    upsertModifyingBoardViewInfo,
    stopModifyingBoardView,
};
