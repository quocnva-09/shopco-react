import type { Meta, StoryObj } from '@storybook/react';
import { StatsBar } from './StatsBar';

const meta: Meta<typeof StatsBar> = {
  title: 'Molecules/StatsBar',
  component: StatsBar,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Danh sách các chỉ số thống kê { value, label }',
    },
  },
  args: {
    items: [
      { value: '200+', label: 'International Brands' },
      { value: '2,000+', label: 'High-Quality Products' },
      { value: '30,000+', label: 'Happy Customers' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof StatsBar>;

// 1. Desktop — 3 stats nằm ngang với divider
export const Default: Story = {};

// 2. Mobile — kiểm tra responsive wrap
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 3. Chỉ 2 stats (kiểm tra trường hợp ít item)
export const TwoStats: Story = {
  args: {
    items: [
      { value: '500+', label: 'Products' },
      { value: '10,000+', label: 'Users' },
    ],
  },
};
