import type { Meta, StoryObj } from '@storybook/react';
import { MainBannerContent } from './MainBannerContent';
import { Button } from '../../atoms/Button';

const defaultStats = [
  { value: '200+', label: 'International Brands' },
  { value: '2,000+', label: 'High-Quality Products' },
  { value: '30,000+', label: 'Happy Customers' },
];

const meta: Meta<typeof MainBannerContent> = {
  title: 'Molecules/MainBannerContent',
  component: MainBannerContent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Tiêu đề chính của banner',
    },
    description: {
      control: 'text',
      description: 'Mô tả phụ bên dưới tiêu đề',
    },
  },
  args: {
    title: 'FIND CLOTHES THAT MATCHES YOUR STYLE',
    description:
      'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.',
    stats: defaultStats,
  },
};

export default meta;
type Story = StoryObj<typeof MainBannerContent>;

// 1. Desktop — đầy đủ nội dung với CTA Button
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '600px', backgroundColor: '#f0eeed', padding: '20px' }}>
      <MainBannerContent {...args}>
        <Button variant="solid" colorScheme="dark">
          Shop Now
        </Button>
      </MainBannerContent>
    </div>
  ),
};

// 2. Mobile View
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ backgroundColor: '#f0eeed', padding: '16px' }}>
      <MainBannerContent {...args}>
        <Button variant="solid" colorScheme="dark" fullWidth>
          Shop Now
        </Button>
      </MainBannerContent>
    </div>
  ),
};
