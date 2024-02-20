import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ModelState } from './types/state';
import { PointerPosition } from './types/action-payloads';
import { isElementValid } from '../lib/is-element-valid';
import { initialState } from './initial-state';

const pointerPositionChanged: CaseReducer<ModelState, PayloadAction<PointerPosition>> = (
    state,
    action,
) => {
    const { pointer, shapes } = state;
    const { clientX, clientY, targetRect } = action.payload;

    if (pointer.status === 'drafting-an-element' && pointer.drafting) {
        const key = pointer.drafting?.elementKey;
        const element = shapes.find((el) => el.uniqueKey === key);
        const { x: initX, y: initY } = pointer.drafting.initialComputedPosition;

        const computed = {
            x: clientX - targetRect.x,
            y: clientY - targetRect.y,
        };

        if (isNaN(initX) || isNaN(initY) || !element) return;

        element.size = {
            width: Math.abs(initX - computed.x),
            height: Math.abs(initY - computed.y),
        };

        element.position = {
            x: initX < computed.x ? element.position.x : computed.x,
            y: initY < computed.y ? element.position.y : computed.y,
        };
    }
};
const pointerDown: CaseReducer<ModelState, PayloadAction<PointerPosition>> = (state, action) => {
    const { clientX, clientY, targetRect } = action.payload;
    const computed = {
        x: clientX - targetRect.x,
        y: clientY - targetRect.y,
    };

    const uniqueKey = crypto.randomUUID();

    state.shapes.push({
        uniqueKey,
        position: {
            x: computed.x,
            y: computed.y,
        },
        size: {
            width: 1,
            height: 1,
        },
        type: 'rect',
        styles: {
            color: 'cyan',
        },
    });
    state.pointer = {
        status: 'drafting-an-element',
        drafting: {
            elementKey: uniqueKey,
            initialComputedPosition: {
                x: computed.x,
                y: computed.y,
            },
        },
    };
};

const pointerUp: CaseReducer<ModelState> = (state) => {
    const { shapes, pointer } = state;
    const key = pointer.drafting?.elementKey;
    const index = shapes.findIndex((el) => el.uniqueKey === key);
    const draftedElement = shapes[index];

    if (!isElementValid(draftedElement)) {
        shapes.splice(index, 1);
    }

    state.pointer = {
        status: 'idle',
        drafting: undefined,
    };
};

const reset: CaseReducer<ModelState> = () => {
    return initialState;
};

export const handlers = {
    pointerDown,
    pointerUp,
    pointerPositionChanged,
    reset,
};
