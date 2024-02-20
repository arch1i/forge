import * as subscribes from './model/selectors';
import { events, kernel } from './model/model';

// model
export const boardModel = {
    events,
    subscribes,
    kernel,
} satisfies Model;
