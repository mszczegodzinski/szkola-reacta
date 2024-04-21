import { type MouseEventHandler, type ComponentProps } from 'react';
import { cn } from '../../utils/cn';

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: string;
} & ComponentProps<'button'>;

export const Button = ({ children, className, onClick, ...rest }: Props) => {
  return (
    <button
      className={cn(
        'cursor-pointer rounded-md border bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      onClick={onClick}
      disabled={rest.disabled}
      {...rest}
    >
      {rest.disabled ? 'Disabled' : children}
    </button>
  );
};
