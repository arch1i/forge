import { authModel } from '~/features/auth';
import { coreApi } from '~/shared/api';
import { combineReducers } from '@reduxjs/toolkit';
import { boardModel } from '~/entities/board';

export const reducer = combineReducers({
    [coreApi.reducerPath]: coreApi.reducer,

    [authModel.kernel.name]: authModel.kernel.reducer,
    [boardModel.kernel.name]: boardModel.kernel.reducer,
});
