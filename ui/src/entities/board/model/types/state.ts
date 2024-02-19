import { Position } from '~/shared/types/core/view';
import { type Element } from './element';

export interface ModelState {
    shapes: Array<Element>;
    pointer: Pointer;
}

export type Pointer = {
    status: 'idle' | 'drafting-an-element';
    drafting?: {
        initialPosition: Position;
        elementKey: UniqueKey;
    };
};
