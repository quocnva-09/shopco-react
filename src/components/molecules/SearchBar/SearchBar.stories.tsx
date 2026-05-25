import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// 1. Trạng thái hiển thị trên Desktop
export const Desktop: Story = {
  render: () => (
    <div style={{ width: '400px' }}> {/* Bọc div để giới hạn khung test */}
      <SearchBar />
    </div>
  ),
};

// 2. Trạng thái hiển thị trên Mobile (Sử dụng viewport giả lập của Storybook)
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => <SearchBar />,
};