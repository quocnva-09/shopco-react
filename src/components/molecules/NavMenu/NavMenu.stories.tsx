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

// 2. Sidebar mobile khi đóng (nằm ngoài màn hình, ẩn)
export const MobileClosed: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#f0f0f0' }}>
        <Story />
        <p style={{ padding: '20px', color: '#666' }}>Sidebar đang ẩn (trượt ra ngoài màn hình bên trái)</p>
      </div>
    ),
  ],
  args: {
    isOpenMobile: false,
  },
};

// 3. Sidebar mobile khi mở — kiểm tra layout & dropdown hiển thị
export const MobileOpen: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      // Wrapper cần position:relative và overflow:hidden để .nav fixed bám vào
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'rgba(0,0,0,0.5)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isOpenMobile: true,
  },
};

// 4. Mobile mở + Dropdown đang mở — kiểm thử xung đột CSS giữa NavMenu và DropdownMenu
// Vì DropdownMenu dùng state nội bộ, story này chỉ mô phỏng đúng context,
// bạn cần click vào "Shop" để mở dropdown và quan sát hành vi.
export const MobileOpenDropdownTest: Story = {
  name: '🔍 Mobile — Kiểm tra Dropdown trong Sidebar',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Mục đích kiểm thử:** Xác nhận dropdown "Shop" hiển thị đúng bên trong sidebar mobile.

**Các bước:**
1. Story render NavMenu ở trạng thái mở (sidebar trượt vào).
2. Click vào **"Shop"** để mở dropdown.
3. Kiểm tra:
   - ✅ Dropdown items hiển thị bên dưới "Shop" (position: static)
   - ✅ Sidebar scroll được nếu nội dung vượt chiều cao
   - ❌ Dropdown **không bị clipped** bởi overflow của sidebar
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '100vh', background: 'rgba(0,0,0,0.5)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isOpenMobile: true,
  },
};