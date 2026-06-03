import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCartClick: { action: "Giỏ hàng được click" },
    onProfileClick: { action: "Hồ sơ người dùng được click" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// 1. Giao diện Header chuẩn trên Desktop
export const DesktopView: Story = {
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "300px" }}>
      <Header {...args} />
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        [ Vùng nội dung Body của trang web bên dưới Header ]
      </div>
    </div>
  ),
};

// 2. Giao diện Header trên Mobile — trạng thái ban đầu (hamburger hiển thị)
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "300px" }}>
      <Header {...args} />
      <div style={{ padding: "20px", color: "#666" }}>
        Click icon hamburger ☰ để mở sidebar navigation
      </div>
    </div>
  ),
};

// 3. Kiểm tra Sidebar mở trên Mobile + Dropdown trong Sidebar
// Đây là story quan trọng nhất để debug xung đột CSS giữa .nav và .dropdown__menu
export const MobileSidebarWithDropdown: Story = {
  name: "🔍 Mobile — Sidebar mở + Dropdown Test",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "fullscreen",
    docs: {
      description: {
        story: `
**Mục đích:** Kiểm tra xung đột CSS giữa \`.nav\` (NavMenu) và \`.dropdown__menu\` (DropdownMenu).

**Các bước kiểm thử:**
1. Click icon **☰ (hamburger)** → Sidebar trượt vào từ trái.
2. Click vào **"Shop"** trong sidebar → Dropdown mở ra.
3. Quan sát:
   - ✅ Các item "Men's Clothes", "Women's Clothes" hiển thị bên dưới "Shop"
   - ✅ Sidebar scroll được nếu nội dung tràn
   - ❌ Dropdown **không bị ẩn hay cắt bởi overflow** của sidebar
        `,
      },
    },
  },
  render: (args) => (
    // height: 100vh để .nav { position: fixed } render đúng trong Storybook iframe
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        position: "relative",
      }}
    >
      <Header {...args} />
      <div style={{ padding: "20px", color: "#666" }}>
        <strong>Hướng dẫn:</strong> Click ☰ để mở sidebar, sau đó click "Shop"
        để kiểm tra dropdown
      </div>
    </div>
  ),
};

// 4. Header trong kịch bản Sticky (cuộn trang)
export const StickyTest: Story = {
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", height: "1500px" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
        <Header {...args} />
      </div>
      <div style={{ padding: "60px 20px", lineHeight: "3" }}>
        <h3>Cuộn chuột xuống để kiểm tra tính năng bám đỉnh (Sticky):</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ...
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          ...
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse. ...
        </p>
      </div>
    </div>
  ),
};
