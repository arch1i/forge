import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/endpoints';
import { events } from '..';

export const checkSession = createAsyncThunk('auth/check-session', async (_args, { dispatch }) => {
  const { data: session } = await dispatch(api.session.initiate());

  if (session?.user) {
    dispatch(events.sessionDefined(session.user));
  }
});
