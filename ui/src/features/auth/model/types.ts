import { type User } from '@prisma/client';

export interface ModelState {
  session?: User;

  processes: {
    signIn: SignInProcess;
    login: LoginProcess;
  };

  effects: {
    checkSession: EffectState;
    login: EffectState;
  };
}

export type Tab = 'sign-up' | 'log-in';

export type Step = 'credentials' | 'verification';

export type SignInProcess = {
  tab: Tab;
  step: Step;
  credentials?: Partial<User>;
};

export type LoginProcess = {
  error?: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};
