import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DraftingMode, type Pointer } from './types/state';
import { type ComputedPosition } from '~/shared/types/core/view';

const startDrafting: CaseReducer<
    Pointer,
    PayloadAction<{
        computedPosition: ComputedPosition;
        uniqueKey: UniqueKey;
        draftingMode: DraftingMode;
    }>
> = (state, action) => {
    const { uniqueKey, computedPosition, draftingMode } = action.payload;

    state.status = 'drafting-an-element';
    state.info['drafting-an-element'] = {
        mode: draftingMode,
        elementKey: uniqueKey,
        initialComputedPosition: computedPosition,
    };
};

const stopDrafting: CaseReducer<Pointer> = (state) => {
    state.status = 'idle';
    state.info['drafting-an-element'] = undefined;
};

export const handlers = {
    startDrafting,
    stopDrafting,
};
