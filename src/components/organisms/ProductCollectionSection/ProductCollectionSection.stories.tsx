import type { Meta, StoryObj } from '@storybook/react';
import { ProductCollectionSection } from './ProductCollectionSection';
import type { ProductCardData } from '@/components/molecules/ProductCard';

// Mock data — 8 sản phẩm để test slider navigation
const mockProducts: ProductCardData[] = [
  {
    id: 1,
    name: 'T-Shirt With Tape Details',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 120,
    originalPrice: 160,
    discountPercentage: 25,
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Skinny Fit Jeans',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 240,
    originalPrice: 260,
    discountPercentage: 8,
    rating: 3.5,
  },
  {
    id: 3,
    name: 'Checkered Shirt',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 180,
    rating: 4.0,
  },
  {
    id: 4,
    name: 'Sleeve Striped T-Shirt',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 19,
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Vertical Striped Shirt',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 212,
    originalPrice: 232,
    discountPercentage: 9,
    rating: 5.0,
  },
  {
    id: 6,
    name: 'Courage Graphic T-Shirt',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 145,
    rating: 4.0,
  },
  {
    id: 7,
    name: 'Loose Fit Bermuda Shorts',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 80,
    rating: 3.0,
  },
  {
    id: 8,
    name: 'Faded Skinny Jeans',
    primaryImage: 'https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png',
    currentPrice: 210,
    rating: 4.5,
  },
];

const meta: Meta<typeof ProductCollectionSection> = {
  title: 'Organisms/ProductCollectionSection',
  component: ProductCollectionSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Tiêu đề section',
    },
    ctaLabel: {
      control: 'text',
      description: 'Nội dung nút CTA bên dưới',
    },
    enableSlider: {
      control: 'boolean',
      description: 'Bật/tắt chế độ slider (mũi tên + scroll)',
    },
    visibleCount: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Số lượng product hiển thị trên 1 lần xem (desktop)',
    },
    onCtaClick: { action: 'View All clicked' },
  },
  args: {
    title: 'NEW ARRIVALS',
    products: mockProducts.slice(0, 4),
    ctaLabel: 'View All',
    enableSlider: true,
    visibleCount: 4,
  },
};

export default meta;
type Story = StoryObj<typeof ProductCollectionSection>;

// 1. Default — 4 sản phẩm với slider bật
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <ProductCollectionSection {...args} />
    </div>
  ),
};

// 2. Many Products — 8 sản phẩm, test slider navigation
export const ManyProducts: Story = {
  args: {
    title: 'TOP SELLING',
    products: mockProducts,
  },
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <ProductCollectionSection {...args} />
    </div>
  ),
};

// 3. No Slider — grid wraps naturally
export const NoSlider: Story = {
  args: {
    title: 'YOU MIGHT ALSO LIKE',
    products: mockProducts,
    enableSlider: false,
  },
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <ProductCollectionSection {...args} />
    </div>
  ),
};

// 4. Mobile View — test scroll-snap behavior
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <div style={{ padding: '0 16px' }}>
      <ProductCollectionSection {...args} />
    </div>
  ),
};

// 5. Custom Visible Count — 3 items per view
export const ThreePerView: Story = {
  args: {
    title: 'TRENDING NOW',
    products: mockProducts.slice(0, 6),
    visibleCount: 3,
  },
  render: (args) => (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 100px' }}>
      <ProductCollectionSection {...args} />
    </div>
  ),
};
