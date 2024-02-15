import { z } from 'zod';
import { SignUpSchema } from 'dto';

export const SignUpSchemaExtended = SignUpSchema.extend({
    confirm: z.string().min(6, { message: 'must be longer' }),
}).superRefine(({ password, confirm }, ctx) => {
    if (password !== confirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `don't match`,
            path: ['confirm'],
        });
    }
});
