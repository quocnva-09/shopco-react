import type { Meta, StoryObj } from '@storybook/react';
import { PriceText } from './index';

const meta: Meta<typeof PriceText> = {
  title: 'Atoms/PriceText',
  component: PriceText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['current', 'old'],
    },
    currency: {
      control: 'text',
      description: 'ISO currency code (e.g. USD, EUR, VND)',
    },
  },
  args: {
    value: 120,
    variant: 'current',
    currency: 'USD',
  },
};

export default meta;
type Story = StoryObj<typeof PriceText>;

export const CurrentPrice: Story = {
  args: {
    variant: 'current',
    value: 1250, // Test whether the formatter adds thousands separator ($1,250) automatically
  },
};

export const OldPrice: Story = {
  args: {
    variant: 'old',
    value: 1600, // Test whether the strikethrough and grey color are applied correctly
  },
};

export const OtherCurrency: Story = {
  args: {
    variant: 'current',
    value: 100,
    currency: 'EUR', // Test formatter flexibility with Euro currency (€100)
  },
};