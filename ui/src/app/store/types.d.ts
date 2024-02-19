import { type TypedStartListening } from '@reduxjs/toolkit';

declare type Store = ReturnType<typeof import('./app-store').createStore>['store'];

declare type AppState = ReturnType<Store['getState']>;

declare type Dispatch = Store['dispatch'];

declare type AppStartListening = TypedStartListening<AppState, Dispatch>;
