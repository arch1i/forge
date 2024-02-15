import {
    type FetchArgs,
    type FetchBaseQueryError,
    type FetchBaseQueryMeta,
    type BaseQueryFn,
} from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV_CONFIG } from '~/shared/config/env.config';
import { tokenService } from '~/shared/services/jwt-token.service';

const REFRESH_TOKENS_API_PATH = 'auth/refresh';

export const queryWithAuthTokens: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
> = fetchBaseQuery({
    baseUrl: ENV_CONFIG.AUTH_SERVICE_URL,
    mode: 'cors',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const access = tokenService.getAccessToken();

        headers.set('Content-Type', 'application/json');
        if (access) {
            headers.set('Authorization', `Bearer ${access}`);
        }

        return headers;
    },
});

export const coreQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let incomingQueryRes = await queryWithAuthTokens(args, api, extraOptions);

    if (incomingQueryRes.error && incomingQueryRes.error.status === 401) {
        const refresh = await queryWithAuthTokens(REFRESH_TOKENS_API_PATH, api, extraOptions);
        const tokens = refresh.data as {
            access: string;
            refresh: string;
        };

        if (tokens) {
            tokenService.setAuthTokens(tokens);
            incomingQueryRes = await queryWithAuthTokens(args, api, extraOptions);
        }
    }

    return incomingQueryRes;
};
