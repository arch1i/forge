import { VariantProps, cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const Loader = ({
    size,
    color,
    className,
}: VariantProps<typeof styles> & { className?: string }) => {
    return <div className={twMerge(styles({ size, color }), className)} />;
};

export const styles = cva(
    'animate-spin inline-block self-center border-current border-t-transparent rounded-full m-0',
    {
        variants: {
            color: {
                blue: ['text-blue-600'],
                white: ['text-zinc-200'],
            },
            size: {
                sm: ['h-5 w-5 border-[2px]'],
                md: ['h-6 w-6 border-[2px]'],
            },
        },
        defaultVariants: {
            color: 'blue',
            size: 'sm',
        },
    },
);
