import { actions, model } from './model/model';

export const pointerModel = {
    actions,
    kernel: {
        name: model.name,
        reducer: model.reducer,
    },
};
