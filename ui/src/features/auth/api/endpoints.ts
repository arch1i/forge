import { z } from 'zod';
import { coreApi } from '~/shared/api';
import { LoginSchema, SignUpSchema, VerificationSchema } from 'dto';
import { type User } from '@prisma/client';
import { type Tokens } from '../model/types';

const authApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, z.infer<typeof SignUpSchema>>({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    verify: builder.mutation<
      {
        verified: boolean;
      },
      z.infer<typeof VerificationSchema>
    >({
      query: (body) => ({
        url: 'auth/verify',
        method: 'PUT',
        body,
      }),
    }),

    login: builder.query<
      {
        tokens: Tokens;
        user: User;
      },
      z.infer<typeof LoginSchema>
    >({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    session: builder.query<
      {
        user: User;
      },
      void
    >({
      query: () => ({
        url: 'auth/session',
        method: 'GET',
      }),
    }),
  }),
});

export const api = authApi.endpoints;
