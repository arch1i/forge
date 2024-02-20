import { Pointer } from './types/state';

export const initialState: Pointer = {
    mode: 'rect',
    status: 'idle',
    state: {},
    styling: {
        rect: {
            strokeColor: 'blue',
        },
    },
};
