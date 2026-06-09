import type { Meta, StoryObj } from '@storybook/react';
import { MainBannerImage } from './index';

const meta: Meta<typeof MainBannerImage> = {
  title: 'Molecules/MainBannerImage',
  component: MainBannerImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Path to the main hero image',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the hero image',
    },
    effectSrc: {
      control: 'text',
      description: 'Path to the decorative SVG effect (star)',
    },
  },
  args: {
    src: 'main-img.jpg',
    alt: 'Main banner image',
    effectSrc: '/images/banner-effect.svg',
  },
};

export default meta;
type Story = StoryObj<typeof MainBannerImage>;

// 1. Desktop — hero image without effect
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '600px', backgroundColor: '#f0eeed', overflow: 'hidden' }}>
      <MainBannerImage {...args} />
    </div>
  ),
};

// 2. Desktop — hero image with decorative effect
export const WithEffects: Story = {
  args: {
    effectSrc: '/images/vector-tick.svg', // Use an existing SVG from public/ for the demo
  },
  render: (args) => (
    <div style={{ maxWidth: '600px', backgroundColor: '#f0eeed', overflow: 'hidden' }}>
      <MainBannerImage {...args} />
    </div>
  ),
};

// 3. Mobile View
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0eeed', overflow: 'hidden', padding: '0 16px' }}>
      <MainBannerImage {...args} />
    </div>
  ),
};
