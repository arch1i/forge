import { ComputedPosition } from '~/shared/types/core/view';
import { type Element } from './element';

export interface ModelState {
    elements: Array<Element>;
    pointer: Pointer;
}

export type Pointer = {
    status: 'idle' | 'drafting-an-element';
    drafting?: {
        initialComputedPosition: ComputedPosition;
        elementKey: UniqueKey;
    };
};
