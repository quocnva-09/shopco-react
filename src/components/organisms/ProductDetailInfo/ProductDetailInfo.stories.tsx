import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailInfo } from "./ProductDetailInfo";
import "@/styles/index.scss";

const meta: Meta<typeof ProductDetailInfo> = {
  title: "Organisms/ProductDetailInfo",
  component: ProductDetailInfo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    product: {
      id: 1,
      name: "One Life Graphic T-Shirt",
      slug: "one-life-graphic-t-shirt",
      description:
        "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
      ratingAvg: 4.5,
      currentPrice: 260,
      originalPrice: 300,
      discountPercent: 40,
      colors: [
        { color: "olive", hex: "#4f4631" },
        { color: "teal", hex: "#314f4a" },
        { color: "navy", hex: "#31344f" },
      ],
      sizes: [
        { size: "S", label: "Small" },
        { size: "M", label: "Medium" },
        { size: "L", label: "Large" },
        { size: "XL", label: "X-Large" },
      ],
      isActive: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      category: { id: 1, name: "T-Shirts", slug: "t-shirts" },
      images: [],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailInfo>;

export const Default: Story = {};
