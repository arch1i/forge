import { defineSession } from './effects/define-session';
import { login } from './effects/login';
import { tokenService } from '~/shared/services/jwt-token.service';

import { type Tab, type Step, type ModelState } from './types';
import { type User } from '@prisma/client';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ModelState = {
    session: undefined,

    processes: {
        signIn: {
            step: 'credentials',
            tab: 'sign-up',
            credentials: undefined,
        },
        login: {
            error: undefined,
        },
    },

    effects: {
        checkSession: {
            error: undefined,
            status: 'idle',
        },
        login: {
            error: undefined,
            status: 'idle',
        },
    },
};

const authModel = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        sessionDefined(state, action: PayloadAction<User>) {
            state.session = action.payload;
        },

        loggedOut() {
            tokenService.resetAuthTokens();
            return initialState;
        },

        signInProcessTabChanged(state, action: PayloadAction<Tab>) {
            state.processes.signIn.tab = action.payload;
        },

        signInProcessStepChanged(state, action: PayloadAction<Step>) {
            state.processes.signIn.step = action.payload;
        },

        signInProcessCredentialsUpdated(state, action: PayloadAction<Partial<User>>) {
            state.processes.signIn.credentials = action.payload;
        },
    },
    extraReducers: (builder) => {
        // check-session
        builder.addCase(defineSession.pending, (state, { meta }) => {
            state.effects.checkSession.status = meta.requestStatus;
        });

        builder.addCase(defineSession.fulfilled, (state, { meta }) => {
            state.effects.checkSession.status = meta.requestStatus;
        });

        builder.addCase(defineSession.rejected, (state, { meta }) => {
            state.effects.checkSession.status = meta.requestStatus;
        });

        // login
        builder.addCase(login.pending, (state, { meta }) => {
            state.effects.login.status = meta.requestStatus;
        });
        builder.addCase(login.fulfilled, (state, { meta }) => {
            state.effects.login.status = meta.requestStatus;
            state.effects.login.error = undefined;
        });
        builder.addCase(login.rejected, (state, { payload, meta }) => {
            state.effects.login.status = meta.requestStatus;
            state.effects.login.error = payload;
        });
    },
});

export const events = authModel.actions;

export const kernel = {
    name: authModel.name,
    reducer: authModel.reducer,
} satisfies TypeOfValue<Model, 'kernel'>;
