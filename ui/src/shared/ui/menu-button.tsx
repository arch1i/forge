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

const styles = cva(
    'text-center w-fit rounded-[4px] whitespace-nowrap flex items-center justify-center',
    {
        variants: {
            color: {
                light: [
                    'text-[#1b1b1f] bg-[#ececf3] hover:bg-[#f1f0fe] active:outline active:outline-1 active:outline-[#4843b9] cursor-pointer',
                ],
            },
            size: {
                md: ['px-2 py-2'],
            },
        },
        defaultVariants: {
            color: 'light',
            size: 'md',
        },
    },
);
