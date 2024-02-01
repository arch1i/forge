import { VariantProps, cva } from 'class-variance-authority';

export const Loader = ({ size, color }: VariantProps<typeof styles>) => {
  return <div className={styles({ size, color })} />;
};

export const styles = cva(
  'animate-spin inline-block self-center border-current border-t-transparent rounded-full m-0',
  {
    variants: {
      color: {
        blue: ['text-blue-600'],
        white: ['text-zinc-300'],
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
