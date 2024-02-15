import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/endpoints';
import { events } from '..';

export const defineSession = createAsyncThunk('auth/define-session', async (_, { dispatch }) => {
    const { user } = await dispatch(api.defineSessionByCookies.initiate()).unwrap();
    if (user) {
        events.sessionDefined(user);
    }
});
