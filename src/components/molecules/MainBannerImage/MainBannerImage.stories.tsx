import type { Meta, StoryObj } from '@storybook/react';
import { MainBannerImage } from './MainBannerImage';

const meta: Meta<typeof MainBannerImage> = {
  title: 'Molecules/MainBannerImage',
  component: MainBannerImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Đường dẫn ảnh hero chính',
    },
    alt: {
      control: 'text',
      description: 'Alt text cho ảnh hero',
    },
    effectSrc: {
      control: 'text',
      description: 'Đường dẫn SVG hiệu ứng trang trí (ngôi sao)',
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

// 1. Desktop — ảnh hero không có effect
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '600px', backgroundColor: '#f0eeed', overflow: 'hidden' }}>
      <MainBannerImage {...args} />
    </div>
  ),
};

// 2. Desktop — ảnh hero có hiệu ứng trang trí
export const WithEffects: Story = {
  args: {
    effectSrc: '/images/vector-tick.svg', // Dùng SVG có sẵn trong public để demo
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
