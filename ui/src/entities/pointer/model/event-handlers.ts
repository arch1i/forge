import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { type Pointer } from './types/state';
import { type ComputedPosition } from '~/shared/types/core/view';

const startDrafting: CaseReducer<
    Pointer,
    PayloadAction<{ computedPosition: ComputedPosition; uniqueKey: UniqueKey }>
> = (state, action) => {
    const modelState = state;
    const { uniqueKey, computedPosition } = action.payload;

    modelState.status = 'drafting-an-element';
    modelState.state['drafting-an-element'] = {
        elementKey: uniqueKey,
        initialComputedPosition: computedPosition,
    };
};

const stopDrafting: CaseReducer<Pointer> = (state) => {
    const modelState = state;

    modelState.status = 'idle';
    modelState.state['drafting-an-element'] = undefined;
};

export const handlers = {
    startDrafting,
    stopDrafting,
};
