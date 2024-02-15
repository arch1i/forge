import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { LoginSchema } from 'dto';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { tokenService } from '~/shared/services/jwt-token.service';
import { api } from '../../api/endpoints';
import { events } from '..';

export const login = createAsyncThunk<
    { success: boolean },
    z.infer<typeof LoginSchema>,
    { rejectValue: string | undefined }
>('auth/login', async (args, { dispatch, rejectWithValue }) => {
    const { data: queryResponse, error } = await dispatch(api.login.initiate(args));

    const errorCode = (error as BaseError)?.status;
    const errorMessage = (error as BaseError)?.data?.message;

    const isVerificationNeeded = errorCode === HttpStatusCode.UpgradeRequired;
    const isSessionDefined = !!queryResponse?.user;

    if (isSessionDefined) {
        tokenService.setAuthTokens(queryResponse.tokens);
        dispatch(events.sessionDefined(queryResponse.user));
    }

    if (isVerificationNeeded) {
        dispatch(events.signInProcessCredentialsUpdated({ email: args.email }));
        dispatch(events.signInProcessStepChanged('verification'));
        dispatch(events.signInProcessTabChanged('sign-up'));
    }

    if (!isVerificationNeeded && error) {
        return rejectWithValue(errorMessage);
    }

    if (isSessionDefined) {
        tokenService.setAuthTokens(queryResponse.tokens);
        dispatch(events.sessionDefined(queryResponse.user));
    }

    return { success: isSessionDefined };
});
