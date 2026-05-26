import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Hướng hiển thị của đường kẻ phân cách',
    },
  },
  args: {
    direction: 'vertical',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// 1. Đường kẻ dọc (mặc định — dùng trong StatsBar)
export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px' }}>
      <span style={{ fontSize: '14px', color: '#666' }}>Item A</span>
      <Divider {...args} />
      <span style={{ fontSize: '14px', color: '#666' }}>Item B</span>
    </div>
  ),
};

// 2. Đường kẻ ngang (dùng trong footer, section separator)
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => (
    <div style={{ width: '400px', padding: '20px' }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Nội dung phía trên</p>
      <Divider {...args} />
      <p style={{ fontSize: '14px', color: '#666', marginTop: '12px' }}>Nội dung phía dưới</p>
    </div>
  ),
};
