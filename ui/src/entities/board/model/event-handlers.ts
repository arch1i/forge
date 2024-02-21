import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { isElementValid } from '../lib/is-element-valid';
import { initialState } from './initial-state';
import { type ModelState } from './types/state';
import { type Pointer } from '~/entities/pointer';
import { type ComputedPointerPosition } from '~/shared/types/core/view';

const resizeElement: CaseReducer<
    ModelState,
    PayloadAction<{ computedPosition: ComputedPointerPosition; pointer: Pointer }>
> = (state, action) => {
    const { elements } = state;
    const { computedPosition, pointer } = action.payload;

    if (pointer.info['drafting-an-element']) {
        const initPointer = pointer.info['drafting-an-element'].initialPointerPosition;

        const key = pointer.info['drafting-an-element']?.elementKey;
        const element = elements.find((el) => el.uniqueKey === key);

        if (!initPointer || !element) return;

        element.size = {
            width: Math.abs(initPointer.x - computedPosition.x),
            height: Math.abs(initPointer.y - computedPosition.y),
        };

        element.position = {
            x: initPointer.x < computedPosition.x ? element.position.x : computedPosition.x,
            y: initPointer.y < computedPosition.y ? element.position.y : computedPosition.y,
        };
    }
};

const createElement: CaseReducer<
    ModelState,
    PayloadAction<{
        computedPosition: ComputedPointerPosition;
        pointer: Pointer;
        uniqueKey: UniqueKey;
    }>
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

const moveElement: CaseReducer<
    ModelState,
    PayloadAction<{ computedPosition: ComputedPointerPosition; pointer: Pointer }>
> = (state, action) => {
    const { elements } = state;
    const { computedPosition, pointer } = action.payload;

    if (pointer.info['drafting-an-element']) {
        const initPointer = pointer.info['drafting-an-element'].initialPointerPosition;
        const initElement = pointer.info['drafting-an-element'].initialElementPosition;

        const key = pointer.info['drafting-an-element']?.elementKey;
        const element = elements.find((el) => el.uniqueKey === key);

        if (!initElement || !initPointer || !element) return;

        element.position = {
            x: initElement.x + (computedPosition.x - initPointer.x),
            y: initElement.y + (computedPosition.y - initPointer.y),
        };
    }
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
    moveElement,
    reset,
};
