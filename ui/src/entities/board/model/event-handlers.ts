import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { isElementValid } from '../lib/is-element-valid';
import { initialState } from './initial-state';
import { type ModelState } from './types/state';
import { type Pointer } from '~/entities/pointer';
import { type ComputedPosition } from '~/shared/types/core/view';

const resizeElement: CaseReducer<
    ModelState,
    PayloadAction<{ computedPosition: ComputedPosition; pointer: Pointer }>
> = (state, action) => {
    const { elements } = state;
    const { computedPosition, pointer } = action.payload;

    if (pointer.state['drafting-an-element']) {
        const { x: initX, y: initY } = pointer.state['drafting-an-element'].initialComputedPosition;
        const key = pointer.state['drafting-an-element']?.elementKey;
        const element = elements.find((el) => el.uniqueKey === key);

        if (isNaN(initX) || isNaN(initY) || !element) return;

        element.size = {
            width: Math.abs(initX - computedPosition.x),
            height: Math.abs(initY - computedPosition.y),
        };

        element.position = {
            x: initX < computedPosition.x ? element.position.x : computedPosition.x,
            y: initY < computedPosition.y ? element.position.y : computedPosition.y,
        };
    }
};

const createElement: CaseReducer<
    ModelState,
    PayloadAction<{ computedPosition: ComputedPosition; pointer: Pointer; uniqueKey: UniqueKey }>
> = (state, action) => {
    const { computedPosition, pointer, uniqueKey } = action.payload;

    if (pointer.mode === 'default') return;

    state.elements.push({
        uniqueKey,
        position: {
            x: computedPosition.x,
            y: computedPosition.y,
        },
        size: {
            width: 1,
            height: 1,
        },
        type: pointer.mode,
        styles: {
            color: pointer.styling[pointer.mode].strokeColor,
        },
    });
};

const validateElement: CaseReducer<
    ModelState,
    PayloadAction<{ elementKey: UniqueKey | undefined }>
> = (state, action) => {
    const { elements } = state;
    const { elementKey } = action.payload;

    if (elementKey) {
        const index = elements.findIndex((el) => el.uniqueKey === elementKey);
        const draftedElement = elements[index];

        if (!isElementValid(draftedElement)) {
            elements.splice(index, 1);
        }
    }
};

const reset: CaseReducer<ModelState> = () => {
    return initialState;
};

export const handlers = {
    createElement,
    validateElement,
    resizeElement,
    reset,
};
