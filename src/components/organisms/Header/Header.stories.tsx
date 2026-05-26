import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    // Ép giao diện hiển thị full-screen trong Storybook để giống thực tế trang web
    layout: 'fullscreen',
  },
  argTypes: {
    // Khai báo để Storybook tự động nhận diện và ghi nhận log tương tác ở tab Actions
    onCartClick: { action: 'Giỏ hàng được click' },
    onProfileClick: { action: 'Hồ sơ người dùng được click' },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// 1. Giao diện Header chuẩn trên Desktop
export const DesktopView: Story = {
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '300px' }}>
      <Header {...args} />
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        [ Vùng nội dung Body của trang web bên dưới Header ]
      </div>
    </div>
  ),
};

// 2. Giao diện Header trên môi trường Mobile để kiểm tra ẩn hiện layout
export const MobileView: Story = {
  parameters: {
    // Cấu hình Viewport ép Storybook chạy ở kích thước màn hình iPhone 13 / Small Mobile
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '300px' }}>
      <Header {...args} />
    </div>
  ),
};

// 3. Giao diện Header khi nằm trong kịch bản Sticky (Cuộn trang)
export const StickyTest: Story = {
  render: (args) => (
    <div style={{ backgroundColor: '#f0f0f0', height: '1500px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <Header {...args} />
      </div>
      <div style={{ padding: '60px 20px', lineHeight: '3' }}>
        <h3>Cuộn chuột xuống để kiểm tra tính năng bám đỉnh (Sticky):</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. ...</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse. ...</p>
      </div>
    </div>
  ),
};