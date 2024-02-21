import { type DraftingMode } from '~/entities/pointer';
import { type Element } from '../model/types/element';

interface Params {
    element: TypeOfValue<Element, 'type'> | 'board';
    draftingMode: DraftingMode | undefined;
}

const MOVING_DRAFTING_CURSOR = {
    moving: {
        rect: 'grabbing',
        board: 'grabbing',
    },
    resizing: {
        rect: 'crosshair',
        board: 'crosshair',
    },
};

const REGULAR_CURSOR = {
    rect: 'grab',
    board: 'default',
};

export function getCursorStyle({ element, draftingMode }: Params) {
    const isDrafting = !!draftingMode;

    if (isDrafting) {
        return MOVING_DRAFTING_CURSOR[draftingMode][element];
    } else {
        return REGULAR_CURSOR[element];
    }
}
