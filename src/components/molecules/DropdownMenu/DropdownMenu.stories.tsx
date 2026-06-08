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

// 1. Default closed state — click to open
export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: '150px' }}>
        <Story />
      </div>
    ),
  ],
};

// 2. Desktop state — dropdown floats up (position: absolute)
// Click "Shop" to verify the dropdown renders correctly
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

// 3. Mobile state — dropdown inline (position: static)
// Verify that the dropdown opens inline, pushing content down rather than being clipped
export const MobileDropdown: Story = {
  name: '📱 Mobile — Dropdown static (inside sidebar)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Check:** On mobile, \`.dropdown__menu\` switches to \`position: static\`
so it will **push content down** rather than floating above (absolute).

Click **"Shop"** to open the dropdown and observe it opening inline.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      // Simulate sidebar environment: colored background, fixed height, overflow-y: auto
      <div
        style={{
          backgroundColor: '#f2f0f1',
          height: '100vh',
          overflowY: 'auto',
          padding: '64px 24px 24px',
        }}
      >
        <Story />
        <p style={{ color: '#888', marginTop: '16px' }}>← Other items in the sidebar</p>
      </div>
    ),
  ],
};