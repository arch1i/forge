import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { LoginSchema } from 'dto';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '~/features/auth/api/endpoints';
import { tokenService } from '~/shared/services/jwt-token.service';
import { actions } from '~/features/auth/model';

export const login = createAsyncThunk<
  { success: boolean },
  z.infer<typeof LoginSchema>,
  { rejectValue: string | undefined }
>('auth/login', async (args, { dispatch, rejectWithValue }) => {
  const { data: queryResponse, error } = await dispatch(authApi.endpoints.login.initiate(args));

  const errorCode = (error as BaseError)?.status;
  const errorMessage = (error as BaseError)?.data?.message;

  const isVerificationNeeded = errorCode === HttpStatusCode.UpgradeRequired;
  const isSessionDefined = !!queryResponse?.user;

  if (isSessionDefined) {
    tokenService.setAuthTokens(queryResponse.tokens);
    dispatch(actions.sessionDefined(queryResponse.user));
  }

  if (isVerificationNeeded) {
    dispatch(actions.signInProcessCredentialsUpdated({ email: args.email }));
    dispatch(actions.signInProcessStepChanged('verification'));
    dispatch(actions.signInProcessTabChanged('sign-up'));
  }

  if (!isVerificationNeeded && error) {
    return rejectWithValue(errorMessage);
  }

  if (isSessionDefined) {
    tokenService.setAuthTokens(queryResponse.tokens);
    dispatch(actions.sessionDefined(queryResponse.user));
  }

  return { success: isSessionDefined };
});
