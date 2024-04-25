import { cn } from '../../utils/cn';

type Props = {
  children: string;
  className?: string;
};

export const Text = ({ className, children }: Props) => {
  return <p className={cn('text-base', className)}>{children}</p>;
};
