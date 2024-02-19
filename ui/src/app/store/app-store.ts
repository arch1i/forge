import { listener } from './middleware';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { reducer } from './reducer';
import { authModel } from '~/features/auth';

export const createStore = () => {
    const _store = configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listener.middleware),
    });

    setupListeners(_store.dispatch);

    const extendedStore = {
        store: _store,

        and: function (callback: (dispatch: typeof _store.dispatch) => Promise<void> | void) {
            callback(_store.dispatch);
            return this;
        },
    };

    return extendedStore;
};

export const store = createStore().and(authModel.initiate).store;
