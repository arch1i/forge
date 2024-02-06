declare type Store = ReturnType<typeof import('./app-store').createStore>['store'];

declare type AppState = ReturnType<AppStore['getState']>;

declare type Dispatch = AppStore['dispatch'];
