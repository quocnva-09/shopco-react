import type { Meta, StoryObj } from '@storybook/react';
import { PriceGroup } from './index';

const meta: Meta<typeof PriceGroup> = {
  title: 'Molecules/PriceGroup',
  component: PriceGroup,
  tags: ['autodocs'],
  argTypes: {
    currentPrice: {
      control: 'number',
      description: 'Current price after discount (required)',
    },
    originalPrice: {
      control: 'number',
      description: 'Original price before discount (optional)',
    },
    discountPercentage: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Discount percentage shown as a badge tag (optional)',
    },
    isDetail: {
      control: 'boolean',
      description: 'Flag to activate the large size and spacing of the Product Detail page',
    },
  },
  args: {
    currentPrice: 120,
    originalPrice: 160,
    discountPercentage: 25,
    isDetail: false,
  },
};

export default meta;
type Story = StoryObj<typeof PriceGroup>;

// 1. Default state in a ProductCard within the grid list
export const DefaultInCard: Story = {
  args: {
    isDetail: false,
  },
};

// 2. Enlarged state used on the Product Detail page
export const InProductDetail: Story = {
  args: {
    currentPrice: 260,
    originalPrice: 300,
    discountPercentage: 13,
    isDetail: true,
  },
};

// 3. Full-price product (no active discount)
export const NoDiscount: Story = {
  args: {
    currentPrice: 200,
    originalPrice: undefined,
    discountPercentage: undefined,
    isDetail: false,
  },
};

// 4. No discount but displayed inside a large Detail page
export const NoDiscountInDetail: Story = {
  args: {
    currentPrice: 200,
    originalPrice: undefined,
    discountPercentage: undefined,
    isDetail: true,
  },
};