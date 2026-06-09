import type { Meta, StoryObj } from '@storybook/react';
import { BrandLogoBar } from './index';

const meta: Meta<typeof BrandLogoBar> = {
  title: 'Molecules/BrandLogoBar',
  component: BrandLogoBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof BrandLogoBar>;

// 1. Desktop — 5 logos in a row on a dark background
export const Default: Story = {
  render: (args) => (
    <div style={{ padding: '0 100px', backgroundColor: '#f0eeed' }}>
      <BrandLogoBar {...args} />
    </div>
  ),
};

// 2. Mobile View — logo wrap center
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '0 16px', backgroundColor: '#f0eeed' }}>
      <BrandLogoBar {...args} />
    </div>
  ),
};

// 3. Fewer logos (check spacing)
export const ThreeLogos: Story = {
  args: {
  },
  render: (args) => (
    <div style={{ padding: '0 100px', backgroundColor: '#f0eeed' }}>
      <BrandLogoBar {...args} />
    </div>
  ),
};
