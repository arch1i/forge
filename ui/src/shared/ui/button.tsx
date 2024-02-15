import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends VariantProps<typeof styles> {
    content: ReactNode | string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = (props: Props) => {
    const { content, className, color, size, disabled = false, onClick, htmlType = 'button' } = props;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={htmlType}
            className={twMerge(styles({ color, size }), className)}
        >
            {content}
        </button>
    );
};

const styles = cva('text-center w-fit rounded-[3px] whitespace-nowrap', {
    variants: {
        color: {
            blue: [
                'text-white bg-blue-600/90 hover:bg-blue-600/95 active:bg-blue-600 cursor-pointer',
            ],
        },
        size: {
            md: ['px-4 py-2 text-base'],
        },
    },
    defaultVariants: {
        color: 'blue',
        size: 'md',
    },
});
