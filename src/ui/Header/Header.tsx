import { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeaderProps = {
  children: string;
  headingLevel: HeadingLevel;
} & ComponentProps<'h1'>;

export const Header = ({ children, headingLevel, className }: HeaderProps) => {
  const Heading = headingLevel;
  const getTextSize = (headingLevel: HeadingLevel) => {
    switch (headingLevel) {
      case 'h1':
        return 'text-2xl';
      case 'h2':
        return 'text-xl';
      case 'h3':
        return 'text-lg';
      case 'h4':
        return 'text-md';
      case 'h5':
        return 'text-sm';
      case 'h6':
        return 'text-xs';
    }
  };
  return (
    <Heading className={cn(getTextSize(headingLevel), className)}>
      {children}
    </Heading>
  );
};
