import * as subscribes from './model/selectors';
import { model } from './model/model';

// model
export const boardModel = {
    actions: model.actions,
    subscribes,
    kernel: {
        name: model.name,
        reducer: model.reducer,
    },
};
