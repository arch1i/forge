import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends VariantProps<typeof styles> {
    content: ReactNode | string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const Button = (props: Props) => {
    const { content, className, color, size, disabled = false, onClick, htmlType = 'button' } = props;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={htmlType}
            className={twMerge(styles({ color, size, disabled }), className)}
        >
            {content}
        </button>
    );
};

const styles = cva('text-center w-fit rounded-[3px] whitespace-nowrap cursor-pointer', {
    variants: {
        color: {
            blue: ['text-white bg-blue-600/90', 'hover:bg-blue-600/95 active:bg-blue-600'],
        },
        size: {
            md: ['px-4 py-2 text-base'],
        },
        disabled: {
            true: [
                'cursor-not-allowed',
                'hover:bg-transparent',
                'active:bg-transparent',
                'active:outline-none',
            ],
        },
    },
    defaultVariants: {
        color: 'blue',
        size: 'md',
    },
});
