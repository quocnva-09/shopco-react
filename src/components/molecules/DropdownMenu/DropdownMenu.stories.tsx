import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const SAMPLE_ITEMS = [
  { label: "Men's Clothes", href: '/shop/men' },
  { label: "Women's Clothes", href: '/shop/women' },
  { label: 'Accessories', href: '/shop/accessories' },
];

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    title: 'Shop',
    items: SAMPLE_ITEMS,
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

// 1. Trạng thái đóng mặc định — click để mở
export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: '150px' }}>
        <Story />
      </div>
    ),
  ],
};

// 2. Trạng thái Desktop — dropdown nổi lên (position: absolute)
// Click "Shop" để kiểm tra dropdown hiển thị đúng
export const DesktopDropdown: Story = {
  name: '🖥️ Desktop — Dropdown absolute',
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: '150px' }}>
        <Story />
      </div>
    ),
  ],
};

// 3. Trạng thái Mobile — dropdown inline (position: static)
// Kiểm tra dropdown mở ra và đẩy nội dung xuống thay vì bị clipped
export const MobileDropdown: Story = {
  name: '📱 Mobile — Dropdown static (trong sidebar)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Kiểm tra:** Trên mobile, \`.dropdown__menu\` đổi sang \`position: static\`
nên sẽ **đẩy nội dung xuống** thay vì nổi lên phía trên (absolute).

Click **"Shop"** để mở dropdown và quan sát nội dung mở ra inline.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      // Mô phỏng môi trường sidebar: nền màu, chiều cao cố định, overflow-y: auto
      <div
        style={{
          backgroundColor: '#f2f0f1',
          height: '100vh',
          overflowY: 'auto',
          padding: '64px 24px 24px',
        }}
      >
        <Story />
        <p style={{ color: '#888', marginTop: '16px' }}>← Các item khác trong sidebar</p>
      </div>
    ),
  ],
};