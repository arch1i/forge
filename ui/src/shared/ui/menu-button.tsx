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

export const MenuButton = (props: Props) => {
    const { content, className, type, size, disabled = false, onClick, htmlType = 'button' } = props;

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={htmlType}
            className={twMerge(styles({ type, size, disabled }), className)}
        >
            {content}
        </button>
    );
};

const styles = cva('w-fit rounded-[4px] whitespace-nowrap tracking-wider font-sans', {
    variants: {
        type: {
            light: [
                'text-[#1b1b1f] bg-[#ececf3] cursor-pointer flex items-center justify-center text-center',
                'hover:bg-[#f1f0fe] active:outline active:outline-1 active:outline-[#4843b9]',
            ],

            transparent: [
                'text-sm text-[#1b1b1f] bg-transparent cursor-pointer text-left',
                'hover:bg-[#f1f0fe] active:outline active:outline-1 active:outline-[#4843b9]',
            ],
        },
        size: {
            md: ['px-2 py-2'],
            lg: ['px-[13px] py-[6px]'],
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
        type: 'light',
        size: 'md',
    },
});
