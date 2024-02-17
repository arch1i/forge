import { effects } from '.';

export function initiate(dispatch: Dispatch) {
    dispatch(effects.defineSession());
}
