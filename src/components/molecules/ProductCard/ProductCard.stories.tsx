import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard, type ProductCardData } from "./ProductCard";

import '@/styles/index.scss'; 
import '@/components/atoms/Tooltip';

// Khởi tạo dữ liệu giả lập (Mock data) của một sản phẩm
const mockProduct: ProductCardData = {
  id: "p1",
  name: "T-Shirt With Tape Details Siêu Cấp Vip Pro Dài Ngoằng",
  primaryImage: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png",
  currentPrice: 120,
  originalPrice: 160,
  discountPercentage: 25,
  rating: 4.5,
};

const meta: Meta<typeof ProductCard> = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    isDetail: {
      control: "boolean",
      description: "Chuyển đổi giữa giao diện ngoài danh sách và giao diện trang chi tiết",
    },
    onClick: { action: "Card được click điều hướng" },
  },
  args: {
    product: mockProduct,
    isDetail: false,
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// 1. Trạng thái hiển thị trong Grid danh sách (Bản mặc định)
export const DefaultGridCard: Story = {
  render: (args) => (
    <div style={{ maxWidth: "295px", padding: "10px" }}>
      <ProductCard {...args} />
    </div>
  ),
};

// 2. Trạng thái sản phẩm không có chương trình giảm giá
export const NoDiscountCard: Story = {
  args: {
    product: {
      ...mockProduct,
      originalPrice: undefined,
      discountPercentage: undefined,
    },
  },
  render: (args) => (
    <div style={{ maxWidth: "295px", padding: "10px" }}>
      <ProductCard {...args} />
    </div>
  ),
};

// 3. Trạng thái hiển thị lớn bên trong trang Chi tiết sản phẩm (Product Detail)
export const DisplayInProductDetail: Story = {
  args: {
    isDetail: true,
  },
  render: (args) => (
    <div style={{ maxWidth: "600px", padding: "20px", backgroundColor: "#fff" }}>
      <ProductCard {...args} />
    </div>
  ),
};

// 4. Trạng thái ảnh sản phẩm bị lỗi hệ thống (Test ảnh Fallback)
export const BrokenImageCard: Story = {
  args: {
    product: {
      ...mockProduct,
      primaryImage: "https://link-anh-loi-linh-tinh.com/image.jpg",
    },
  },
  render: (args) => (
    <div style={{ maxWidth: "295px", padding: "10px" }}>
      <ProductCard {...args} />
    </div>
  ),
};