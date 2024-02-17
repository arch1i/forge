import * as model from './model';
import { api } from './api/endpoints';

// model
export const authModel = {
    events: model.events,
    effects: model.effects,
    subscribes: model.subscribes,
    kernel: model.kernel,
    initiate: model.initiate,
    api,
} satisfies Model;

// UI
export { AuthActions } from './ui/auth-actions.button';
export { SignIn } from './ui/sign-in';
