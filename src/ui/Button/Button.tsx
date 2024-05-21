import { type ComponentProps } from 'react';
import { cn } from '../../utils/cn';

type Props = {
  children: string;
} & ComponentProps<'button'>;

export const Button = ({ children, className, ...rest }: Props) => {
  const { onClick, disabled } = rest;
  return (
    <button
      className={cn(
        'cursor-pointer rounded-md border bg-blue-600 px-4 py-1 text-sm text-white transition-all hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
