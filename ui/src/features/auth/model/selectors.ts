import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useSignInProcessStep = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.processes.signIn,
      (process) => process.step,
    ),
  );

export const useSignInProcessTab = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.processes.signIn,
      (process) => process.tab,
    ),
  );

export const useSignInProcessCredentials = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.processes.signIn,
      (process) => process.credentials,
    ),
  );

export const useSession = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.session,
    ),
  );

export const useSessionCheckEffectState = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.effects.checkSession,
    ),
  );

export const useLoginEffectState = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.effects.login,
    ),
  );
