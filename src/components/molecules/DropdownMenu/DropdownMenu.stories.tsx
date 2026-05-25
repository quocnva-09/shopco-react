import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    title: 'Shop',
    href: '#',
    items: [
      { label: "Men's Clothes", href: '/shop/men' },
      { label: "Women's Clothes", href: '/shop/women' },
      { label: 'Accessories', href: '/shop/accessories' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// 1. Trạng thái đóng mặc định
export const Default: Story = {
  args: {
    isOpen: false,
  },
};

// 2. Ép trạng thái mở để check CSS menu xổ xuống
export const ForcedOpen: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => (
    <div style={{ paddingBottom: '150px' }}> {/* Tạo khoảng trống để không bị khuất menu con */}
      <DropdownMenu {...args} />
    </div>
  ),
};