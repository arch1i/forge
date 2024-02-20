import { ComputedPosition } from '~/shared/types/core/view';

export type Pointer = {
    mode: 'default' | 'rect';

    styling: Styling;

    status: 'idle' | 'drafting-an-element';

    info: Info;
};

type Info = {
    'drafting-an-element'?: {
        mode: DraftingMode;
        initialComputedPosition: ComputedPosition;
        elementKey: UniqueKey;
    };
};

export type DraftingMode = 'resizing' | 'moving';

type Styling = {
    rect: {
        strokeColor: string;
    };
};
