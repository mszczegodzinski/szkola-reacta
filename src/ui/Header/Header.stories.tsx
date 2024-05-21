import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

const meta = {
  title: 'UI/Header',
  tags: ['autodocs'],
  args: { children: 'My App', headingLevel: 'h1' },
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    children: 'h1 header',
    headingLevel: 'h1',
    className: 'text-2xl',
  },
};

export const H2: Story = {
  args: {
    children: 'h2 header',
    headingLevel: 'h2',
    className: 'text-xl',
  },
};
