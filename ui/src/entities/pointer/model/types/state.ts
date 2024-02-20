import { ComputedPosition } from '~/shared/types/core/view';

export type Pointer = {
    mode: 'default' | 'rect';

    styling: Styling;

    status: 'idle' | 'drafting-an-element';

    state: State;
};

type State = {
    'drafting-an-element'?: {
        initialComputedPosition: ComputedPosition;
        elementKey: UniqueKey;
    };
};

type Styling = {
    rect: {
        strokeColor: string;
    };
};
