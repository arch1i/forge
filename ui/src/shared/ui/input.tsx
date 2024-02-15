import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input as TextFiled, Typography } from 'antd';
import { twMerge } from 'tailwind-merge';

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    type?: 'text' | 'password' | 'email' | 'number';
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ name, disabled, label, className, placeholder, type }) => {
        const {
            control,
            formState: { errors },
        } = useFormContext();
        const error = errors[name]?.message?.toString();

        return (
            <Controller
                name={name}
                control={control}
                defaultValue=''
                render={({ field: { onChange } }) => (
                    <main className={twMerge(className, 'flex flex-col gap-1 items-start w-full')}>
                        <Label label={label} error={error} />
                        <TextFiled
                            size='large'
                            disabled={disabled}
                            placeholder={placeholder || 'enter your ' + name}
                            type={type}
                            status={error ? 'error' : undefined}
                            className='w-full'
                            onChange={(event) => onChange(event.target.value)}
                        />
                    </main>
                )}
            />
        );
    },
);

export function Label({ label, error }: { label: string | undefined; error: string | undefined }) {
    if (!label) return null;

    return (
        <Typography.Text type={error ? 'danger' : undefined} className='ml-1'>
            {error ? label + ' ' + error : label}
        </Typography.Text>
    );
}
