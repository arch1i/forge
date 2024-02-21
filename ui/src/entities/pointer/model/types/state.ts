import { type ElementType } from '~/entities/board';
import { type ComputedPointerPosition } from '~/shared/types/core/view';

export type Pointer = {
    mode: 'default' | ElementType;
    status: 'idle' | 'drafting-an-element';
    info: Info;

    styling: Styling;
};

export type DraftingMode = 'resizing' | 'moving';

type Info = {
    'drafting-an-element'?: {
        mode: DraftingMode;
        elementKey: UniqueKey;
        initialPointerPosition?: ComputedPointerPosition;
        initialElementPosition?: ComputedPointerPosition;
    };
};

type Styling = Record<ElementType, any>;
