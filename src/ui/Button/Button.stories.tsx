import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    children: 'Blue',
    className: 'bg-blue-500 hover:bg-blue-400',
  },
};

export const Green: Story = {
  args: {
    children: 'Green',
    className: 'bg-green-500 hover:bg-green-400',
  },
};

export const Red: Story = {
  args: {
    children: 'Red',
    className: 'bg-red-500 hover:bg-red-400',
  },
};
