import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./index";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCartClick: { action: "Cart icon clicked" },
    onProfileClick: { action: "Profile icon clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// 1. Standard Header layout on Desktop
export const DesktopView: Story = {
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "300px" }}>
      <Header {...args} />
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        [ Page body content below the Header ]
      </div>
    </div>
  ),
};

// 2. Header layout on Mobile — initial state (hamburger visible)
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "300px" }}>
      <Header {...args} />
      <div style={{ padding: "20px", color: "#666" }}>
        Click the hamburger icon ☰ to open the sidebar navigation
      </div>
    </div>
  ),
};

// 3. Sidebar open on Mobile + Dropdown inside Sidebar
// The most important story for debugging CSS conflicts between .nav and .dropdown__menu
export const MobileSidebarWithDropdown: Story = {
  name: "🔍 Mobile — Sidebar open + Dropdown Test",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    layout: "fullscreen",
    docs: {
      description: {
        story: `
**Purpose:** Test CSS conflicts between \`.nav\` (NavMenu) and \`.dropdown__menu\` (DropdownMenu).

**Test steps:**
1. Click the **☰ (hamburger)** icon → Sidebar slides in from the left.
2. Click **"Shop"** in the sidebar → Dropdown opens.
3. Observe:
   - ✅ Items "Men's Clothes", "Women's Clothes" appear below "Shop"
   - ✅ Sidebar is scrollable if content overflows
   - ❌ Dropdown is **not hidden or clipped by sidebar overflow**
        `,
      },
    },
  },
  render: (args) => (
    // height: 100vh so that .nav { position: fixed } renders correctly inside the Storybook iframe
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
        <strong>Instructions:</strong> Click ☰ to open the sidebar, then click "Shop" to test the dropdown
      </div>
    </div>
  ),
};

// 4. Header in Sticky scenario (page scroll)
export const StickyTest: Story = {
  render: (args) => (
    <div style={{ backgroundColor: "#f0f0f0", height: "1500px" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
        <Header {...args} />
      </div>
      <div style={{ padding: "60px 20px", lineHeight: "3" }}>
        <h3>Scroll down to test the sticky behavior:</h3>
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
