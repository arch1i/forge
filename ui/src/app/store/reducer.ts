import { combineReducers } from '@reduxjs/toolkit';
import { authModel } from '~/features/auth';
import { coreApi } from '~/shared/api';
import { boardModel } from '~/entities/board';
import { pointerModel } from '~/entities/pointer';

export const reducer = combineReducers({
    [coreApi.reducerPath]: coreApi.reducer,

    [authModel.kernel.name]: authModel.kernel.reducer,

    [boardModel.kernel.name]: boardModel.kernel.reducer,
    [pointerModel.kernel.name]: pointerModel.kernel.reducer,
});
