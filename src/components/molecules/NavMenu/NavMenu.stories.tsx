import type { Meta, StoryObj } from '@storybook/react';
import { NavMenu } from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  title: 'Molecules/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

// 1. Giao diện hàng ngang trên Desktop
export const Desktop: Story = {
  args: {
    isOpenMobile: false,
  },
};

// 2. Giao diện Sidebar trên Mobile khi được kích hoạt mở
export const MobileOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen', // Bỏ padding của Storybook để tràn màn hình chuẩn mobile
  },
  args: {
    isOpenMobile: true,
  },
};