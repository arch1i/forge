import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DraftingMode, type Pointer } from './types/state';
import { type ComputedPosition } from '~/shared/types/core/view';

const startDrafting: CaseReducer<
    Pointer,
    PayloadAction<{
        uniqueKey: UniqueKey;
        draftingMode: DraftingMode;
        initialPointerPosition?: ComputedPosition;
        initialElementPosition?: ComputedPosition;
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

export const handlers = {
    startDrafting,
    stopDrafting,
};
