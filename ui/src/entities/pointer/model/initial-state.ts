import { type Pointer } from './types/state';

export const initialState: Pointer = {
    mode: 'rect',
    status: 'idle',
    info: {},
    styling: {
        rect: {
            strokeColor: 'blue',
        },
    },
};
