import { PropsWithoutRef, ReactNode } from 'react';
import { FormProvider, useForm, type UseFormProps } from 'react-hook-form';
import { ForwardedRef, forwardRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, type ZodType } from 'zod';
import { twMerge } from 'tailwind-merge';
import { SecondaryButton } from '~/shared/ui/secondary-button';
import { Loader } from './preloader';

export const FORM_ERROR = 'FORM_ERROR';

export interface OnSubmitResult {
    FORM_ERROR?: string;
    [prop: string]: unknown;
}

export interface FormProps<S extends z.ZodType<any, any>>
    extends OmitStrict<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
    schema: S;
    onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
    isLoading?: boolean;
    errorMessage?: string | null | undefined;
    submitText?: string | undefined;
    addClass?: string | undefined;
    children?: ReactNode | undefined;
    initialValues?: UseFormProps<z.infer<S>>['defaultValues'];
}

function FormElement<S extends ZodType<any, any>>(
    {
        schema,
        onSubmit,
        errorMessage,
        submitText,
        children,
        isLoading,
        className,
        ...props
    }: FormProps<S>,
    ref: ForwardedRef<HTMLFormElement>,
) {
    const ctx = useForm<z.infer<S>>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(schema),
    });

    const handleSubmit = ctx.handleSubmit(async (values) => {
        await onSubmit(values);
    });

    return (
        <FormProvider {...ctx}>
            <form
                ref={ref}
                onSubmit={handleSubmit}
                className={twMerge(className, 'flex flex-col gap-4')}
                {...props}
            >
                {children}

                {submitText ? (
                    <div className='flex flex-col items-center'>
                        <SecondaryButton
                            htmlType='submit'
                            className='mt-[14px] w-full '
                            content={
                                !isLoading ? (
                                    <Loader color='white' size='sm' className='-mb-1' />
                                ) : (
                                    submitText
                                )
                            }
                        />

                        <Error message={errorMessage} />
                    </div>
                ) : null}
            </form>
        </FormProvider>
    );
}

export const Form = forwardRef(FormElement) as <S extends ZodType<any, any>>(
    props: FormProps<S> & { ref?: ForwardedRef<HTMLFormElement> },
) => ReturnType<typeof FormElement>;

export const Error = ({ message }: { message?: string | null | undefined }) => {
    if (!message) return null;

    return <span className='mt-3 text-[#d32f2f]'>{message}</span>;
};
