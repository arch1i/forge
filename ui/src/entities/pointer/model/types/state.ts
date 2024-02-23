import { type ElementType } from '~/entities/board';
import { type ComputedPointerPosition } from './core';

export type Pointer = {
    mode: 'default' | ElementType;
    status: 'idle' | 'drafting-an-element';
    info: {
        'drafting-an-element'?: {
            mode: DraftingMode;
            elementKey: UniqueKey;
            initialPointerPosition?: ComputedPointerPosition;
            initialElementPosition?: ComputedPointerPosition;
        };
    };

    styling: Record<ElementType, any>;
};

export type DraftingMode = 'resizing' | 'moving';
