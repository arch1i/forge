import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { reducer } from './reducer';

export const createStore = () => {
  const _store = configureStore({
    reducer,
  });

  setupListeners(_store.dispatch);

  const result = {
    store: _store,
    and: function (callback: (dispatch: typeof _store.dispatch) => void) {
      callback(_store.dispatch);
      return result;
    },
  };

  return result;
};

export const store = createStore().store;
