import type { Meta, StoryObj } from '@storybook/react';
import { BannerSection } from './BannerSection';

const defaultStats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
];

const meta: Meta<typeof BannerSection> = {
  title: 'Organisms/BannerSection',
  component: BannerSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Tiêu đề hero chính',
    },
    description: {
      control: 'text',
      description: 'Mô tả phụ bên dưới tiêu đề',
    },
    ctaLabel: {
      control: 'text',
      description: 'Nội dung nút CTA',
    },
    onCtaClick: { action: 'CTA button clicked' },
  },
  args: {
    title: 'FIND CLOTHES THAT MATCHES YOUR STYLE',
    description:
      'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.',
    ctaLabel: 'Shop Now',
    stats: defaultStats,
    heroImage: {
      src: 'main-img.jpg',
      alt: 'Main banner image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BannerSection>;

// 1. Desktop View — toàn bộ BannerSection đầy đủ
export const DesktopView: Story = {
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <BannerSection {...args} />
    </div>
  ),
};

// 2. Mobile View — kiểm tra responsive layout
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '0 16px' }}>
      <BannerSection {...args} />
    </div>
  ),
};

// 3. Với hiệu ứng trang trí (star effects)
export const WithEffects: Story = {
  args: {
    effectSrc: '/images/banner-effect.svg',
  },
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <BannerSection {...args} />
    </div>
  ),
};
