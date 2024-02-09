import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '~/features/auth/api/endpoints';
import { actions } from '..';

export const checkSession = createAsyncThunk('auth/check-session', async (_args, { dispatch }) => {
  const { data: session } = await dispatch(authApi.endpoints.session.initiate());
  if (session?.user) {
    dispatch(actions.sessionDefined(session.user));
  }
});
