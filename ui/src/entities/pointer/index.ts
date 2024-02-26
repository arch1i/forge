import { actions, model } from './model/model';
import * as selectors from './model/selectors';

// model
export const pointerModel = {
    actions,
    selectors,
    kernel: {
        name: model.name,
        reducer: model.reducer,
    },
};

// types
export { type ComputedPointerPosition, type PointerBaseEvent } from './model/types/core';
export { type Pointer, type DraftingMode } from './model/types/state';

// lib
export { getComputedPosition, getComputedTouchPositions } from './lib/get-computed-position';
export { isMainButtonPressed } from './lib/is-main-button-pressed';
