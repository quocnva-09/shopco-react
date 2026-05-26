import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard, type ReviewData } from './ReviewCard';
import '@/styles/index.scss';

const mockReview: ReviewData = {
  id: 1,
  name: 'Samantha D. Siêu Cấp Thành Viên VIP Toàn Cầu',
  rating: 5,
  comment: '"I absolutely love this t-shirt! The material is so soft and comfortable. I\'ve washed it multiple times and the color hasn\'t faded at all. Highly recommend to anyone looking for a stylish yet everyday essential garment that fits perfectly in any wardrobe."',
  date: 'on August 14, 2025',
  isVerified: true,
};

const meta: Meta<typeof ReviewCard> = {
  title: 'Molecules/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  argTypes: {
    onMenuClick: { action: 'Nút 3 chấm được click' },
  },
  args: {
    review: mockReview,
    onMenuClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

// 1. Trạng thái hiển thị chuẩn trên Desktop (Cắt chữ + Có nút 3 chấm)
export const DesktopView: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <ReviewCard {...args} />
    </div>
  ),
};

// 2. Trạng thái hiển thị trên Mobile (Bung toàn bộ text comment, ẩn nút 3 chấm)
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => (
    <div style={{ maxWidth: '340px', padding: '10px' }}>
      <ReviewCard {...args} />
    </div>
  ),
};