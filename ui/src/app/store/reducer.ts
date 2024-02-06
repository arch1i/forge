import { authModel } from '~/features/auth';
import { coreApi } from '~/shared/api';
// import { sidebarModel } from '~/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [coreApi.reducerPath]: coreApi.reducer,
  [authModel.name]: authModel.reducer,

  // [sidebarModel.name]: sidebarModel.reducer,
});
