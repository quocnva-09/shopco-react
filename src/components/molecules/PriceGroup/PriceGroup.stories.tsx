import type { Meta, StoryObj } from '@storybook/react';
import { PriceGroup } from './PriceGroup';

const meta: Meta<typeof PriceGroup> = {
  title: 'Molecules/PriceGroup',
  component: PriceGroup,
  tags: ['autodocs'],
  argTypes: {
    currentPrice: {
      control: 'number',
      description: 'Giá hiện tại sau khi giảm (Bắt buộc)',
    },
    originalPrice: {
      control: 'number',
      description: 'Giá gốc trước khi giảm (Không bắt buộc)',
    },
    discountPercentage: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Phần trăm giảm giá hiển thị dạng tag (Không bắt buộc)',
    },
    isDetail: {
      control: 'boolean',
      description: 'Cờ kích hoạt kích thước lớn và khoảng cách của trang Product Detail',
    },
  },
  args: {
    currentPrice: 120,
    originalPrice: 160,
    discountPercentage: 25,
    isDetail: false,
  },
};

export default meta;
type Story = StoryObj<typeof PriceGroup>;

// 1. Trạng thái mặc định hiển thị trong ProductCard ngoài Grid danh sách
export const DefaultInCard: Story = {
  args: {
    isDetail: false,
  },
};

// 2. Trạng thái phóng to dùng trong trang Chi tiết sản phẩm (Product Detail)
export const InProductDetail: Story = {
  args: {
    currentPrice: 260,
    originalPrice: 300,
    discountPercentage: 13,
    isDetail: true,
  },
};

// 3. Trạng thái sản phẩm bán đúng giá (Không có chương trình giảm giá)
export const NoDiscount: Story = {
  args: {
    currentPrice: 200,
    originalPrice: undefined,
    discountPercentage: undefined,
    isDetail: false,
  },
};

// 4. Trạng thái không giảm giá nhưng nằm trong trang Detail lớn
export const NoDiscountInDetail: Story = {
  args: {
    currentPrice: 200,
    originalPrice: undefined,
    discountPercentage: undefined,
    isDetail: true,
  },
};