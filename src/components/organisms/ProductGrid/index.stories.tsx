import type { Meta, StoryObj } from "@storybook/react";
import { ProductGrid } from "./index";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { ProductCardData } from "@/types/product";

const meta = {
  title: "Components/Organisms/ProductGrid",
  component: ProductGrid,
  tags: ["autodocs"],
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProducts: ProductCardData[] = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    currentPrice: 145,
    rating: 3.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=T-Shirt",
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    currentPrice: 180,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Polo",
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    currentPrice: 120,
    originalPrice: 150,
    discountPercentage: 20,
    rating: 5.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Striped",
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    currentPrice: 240,
    originalPrice: 260,
    discountPercentage: 20,
    rating: 3.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Jeans",
  },
  {
    id: 5,
    name: "Checkered Shirt",
    currentPrice: 180,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Shirt",
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 30,
    rating: 4.5,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Sleeve",
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    currentPrice: 212,
    originalPrice: 232,
    discountPercentage: 20,
    rating: 5.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Vertical",
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    currentPrice: 145,
    rating: 4.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Courage",
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    currentPrice: 80,
    rating: 3.0,
    primaryImage: "https://via.placeholder.com/295x298.png?text=Shorts",
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 925, margin: "0 auto", padding: "20px" }}>
      <ProductGrid>
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div style={{ padding: "16px", maxWidth: 390, margin: "0 auto" }}>
      <ProductGrid>
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  ),
};
