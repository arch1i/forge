import { actions, model } from './model/model';

// model
export const pointerModel = {
    actions,
    kernel: {
        name: model.name,
        reducer: model.reducer,
    },
};

// types
export { type PointerPosition } from './model/types/core';
export { type Pointer } from './model/types/state';

// lib
export { getComputedPointerPosition } from './lib/get-computed-pointer-position';
