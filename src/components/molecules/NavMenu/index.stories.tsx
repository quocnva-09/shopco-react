import type { Meta, StoryObj } from '@storybook/react';
import { NavMenu } from './index';

const meta: Meta<typeof NavMenu> = {
  title: 'Molecules/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

// 1. Horizontal layout on Desktop
export const Desktop: Story = {
  args: {
    isOpenMobile: false,
  },
};

// 2. Mobile sidebar when closed (off-screen, hidden)
export const MobileClosed: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#f0f0f0' }}>
        <Story />
        <p style={{ padding: '20px', color: '#666' }}>Sidebar is hidden (slid off the left edge of the screen)</p>
      </div>
    ),
  ],
  args: {
    isOpenMobile: false,
  },
};

// 3. Mobile sidebar when open — check layout & dropdown rendering
export const MobileOpen: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      // Wrapper needs position:relative and overflow:hidden so the fixed .nav anchors correctly
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'rgba(0,0,0,0.5)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isOpenMobile: true,
  },
};

// 4. Mobile open + Dropdown open — test for CSS conflicts between NavMenu and DropdownMenu
// Since DropdownMenu uses internal state, this story simulates the correct context;
// you need to click "Shop" to open the dropdown and observe the behavior.
export const MobileOpenDropdownTest: Story = {
  name: '🔍 Mobile — Test Dropdown inside Sidebar',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Test Purpose:** Confirm that the "Shop" dropdown renders correctly inside the mobile sidebar.

**Steps:**
1. Story renders NavMenu in open state (sidebar slides in).
2. Click **"Shop"** to open the dropdown.
3. Verify:
   - ✅ Dropdown items appear below "Shop" (position: static)
   - ✅ Sidebar is scrollable if content overflows
   - ❌ Dropdown is **not clipped** by the sidebar's overflow
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