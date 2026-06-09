import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./";
import type { ProductCardData } from "@/types/product";
import '@/styles/index.scss'; 
import '@/components/atoms/Tooltip';

// Initialize mock data for a product
const mockProduct: ProductCardData = {
  id: 1,
  name: "T-Shirt With Tape Details — Super Long Name For Truncation Testing",
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
      description: 'Toggle between list grid view and product detail view',
    },
    onClick: { action: 'Card navigation clicked' },
  },
  args: {
    product: mockProduct,
    isDetail: false,
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// 1. Default state in the product grid list
export const DefaultGridCard: Story = {
  render: (args) => (
    <div style={{ maxWidth: "295px", padding: "10px" }}>
      <ProductCard {...args} />
    </div>
  ),
};

// 2. Product with no active discount
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

// 3. Large display inside the Product Detail page
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

// 4. Product with a broken image URL (test fallback image)
export const BrokenImageCard: Story = {
  args: {
    product: {
      ...mockProduct,
      primaryImage: "https://broken-image-url-for-testing.com/image.jpg",
    },
  },
  render: (args) => (
    <div style={{ maxWidth: "295px", padding: "10px" }}>
      <ProductCard {...args} />
    </div>
  ),
};