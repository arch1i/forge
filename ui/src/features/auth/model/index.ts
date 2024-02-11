import { login } from './effects/login';
import { checkSession } from './effects/check-session';
import { name, reducer } from './model';

export const kernel = {
  name,
  reducer,
};

export { actions as events } from './model.ts';

export const effects = {
  login,
  checkSession,
};

export * as subscribes from './selectors';

export { SignUpSchemaExtended } from './schemas/sign-up.schema';
export { VerificationSchemaExtended } from './schemas/verification.schema';
