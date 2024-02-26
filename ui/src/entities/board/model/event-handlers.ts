import { isElementValid } from '../lib/is-element-valid';
import { initialState } from './initial-state';
import { type Board } from './types/state';
import { type Pointer } from '~/entities/pointer';
import { type ComputedPointerPosition } from '~/entities/pointer';
import { type CaseReducer, type PayloadAction } from '@reduxjs/toolkit';

const resizeElement: CaseReducer<
    Board,
    PayloadAction<{ computedPosition: ComputedPointerPosition; pointer: Pointer }>
> = (state, action) => {
    const { elements } = state;
    const { computedPosition: position, pointer } = action.payload;

    if (pointer.info['drafting-an-element']) {
        const initialPointerPosition = pointer.info['drafting-an-element'].initialPointerPosition;

        const key = pointer.info['drafting-an-element']?.elementKey;
        const element = elements.find((el) => el.uniqueKey === key);

        if (!initialPointerPosition || !element) return;

        element.size = {
            width: Math.abs(initialPointerPosition.computedX - position.computedX),
            height: Math.abs(initialPointerPosition.computedY - position.computedY),
        };

        element.position = {
            computedX:
                initialPointerPosition.computedX < position.computedX
                    ? element.position.computedX
                    : position.computedX,
            computedY:
                initialPointerPosition.computedY < position.computedY
                    ? element.position.computedY
                    : position.computedY,
        };
    }
};

const createElement: CaseReducer<
    Board,
    PayloadAction<{
        computedPosition: ComputedPointerPosition;
        pointer: Pointer;
        uniqueKey: UniqueKey;
    }>
> = (state, action) => {
    const { computedPosition: position, pointer, uniqueKey } = action.payload;

    if (pointer.mode === 'rect') {
        state.elements.push({
            uniqueKey,
            position: {
                computedX: position.computedX,
                computedY: position.computedY,
            },
            size: {
                width: 0,
                height: 0,
            },
            type: pointer.mode,
            styles: {
                color: pointer.styling[pointer.mode].strokeColor,
            },
        });
    }
};

const moveElement: CaseReducer<
    Board,
    PayloadAction<{ computedPosition: ComputedPointerPosition; pointer: Pointer }>
> = (state, action) => {
    const { elements } = state;
    const { computedPosition: position, pointer } = action.payload;

    if (pointer.info['drafting-an-element']) {
        const initialPointerPosition = pointer.info['drafting-an-element'].initialPointerPosition;
        const initialElementPosition = pointer.info['drafting-an-element'].initialElementPosition;

        const key = pointer.info['drafting-an-element']?.elementKey;
        const element = elements.find((el) => el.uniqueKey === key);

        if (!initialElementPosition || !initialPointerPosition || !element) return;

        element.position = {
            computedX:
                initialElementPosition.computedX +
                (position.computedX - initialPointerPosition.computedX),
            computedY:
                initialElementPosition.computedY +
                (position.computedY - initialPointerPosition.computedY),
        };
    }
};

const validateAllElements: CaseReducer<Board> = (state) => {
    state.elements = state.elements.filter((el) => isElementValid(el));
};

const changeScale: CaseReducer<Board, PayloadAction<{ newValue: number }>> = (state, action) => {
    const { newValue } = action.payload;
    // if( newValue < 1) return;
    state.scale = newValue;
};

const reset: CaseReducer<Board> = () => {
    return initialState;
};

export const handlers = {
    createElement,
    validateAllElements,

    resizeElement,
    moveElement,

    changeScale,
    reset,
};
