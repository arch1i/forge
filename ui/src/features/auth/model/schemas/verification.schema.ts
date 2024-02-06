import { VerificationSchema } from 'dto';

export const VerificationSchemaExtended = VerificationSchema.pick({ code: true });
