import { z } from 'zod';
import { useAppDispatch } from '~/app/store/hooks';
import { Form } from '~/shared/ui/form';
import { Input } from '~/shared/ui/input';
import { authModel } from '~/features/auth';
import { SignUpSchemaExtended, VerificationSchemaExtended } from '~/features/auth/model';
import { VerificationForm } from '~/features/auth/ui/forms/verification.form';
import { type OnSubmitResult } from '~/shared/ui/form';

export const SignUp = () => {
    const dispatch = useAppDispatch();

    const step = authModel.subscribes.useSignInProcessStep();
    const processCredentials = authModel.subscribes.useSignInProcessCredentials();

    const [signUp, { isLoading: isSignUpLoading, error: signUpError }] =
        authModel.api.signUp.useMutation();
    const [verify, { isLoading: isVerifyLoading, error: verifyError, data: verificationResponse }] =
        authModel.api.verify.useMutation();

    const handleSignUp = async (credentials: z.infer<typeof SignUpSchemaExtended>) => {
        Reflect.deleteProperty(credentials, 'confirmPassword');
        const signedUser = await signUp(credentials).unwrap();

        dispatch(authModel.events.signInProcessCredentialsUpdated(signedUser));
        dispatch(authModel.events.signInProcessStepChanged('verification'));
    };

    const handleVerify = async (payload: z.infer<typeof VerificationSchemaExtended>) => {
        if (!processCredentials?.email) return;
        await verify({ code: payload.code, email: processCredentials.email });
    };

    return step === 'credentials' ? (
        <SignUpForm
            onSubmit={handleSignUp}
            isLoading={isSignUpLoading}
            error={(signUpError as BaseError)?.data?.message}
        />
    ) : (
        <VerificationForm
            successfullyVerified={!!verificationResponse?.verified}
            onSubmit={handleVerify}
            isLoading={isVerifyLoading}
            error={(verifyError as BaseError)?.data.message}
        />
    );
};

function SignUpForm({
    onSubmit,
    isLoading,
    error,
}: {
    onSubmit: (credentials: z.infer<typeof SignUpSchemaExtended>) => Promise<void | OnSubmitResult>;
    isLoading: boolean;
    error?: string | undefined;
}) {
    return (
        <Form
            onSubmit={onSubmit}
            schema={SignUpSchemaExtended}
            errorMessage={error}
            isLoading={isLoading}
            submitText='Sign Up'
            className='w-full'
        >
            <Input name='email' type='email' label='Email' />
            <Input name='password' type='password' label='Password' />
            <Input
                name='confirm'
                type='password'
                label='Confirm password'
                placeholder='confirm entered password'
            />
        </Form>
    );
}
