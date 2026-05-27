import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailInfo } from "./ProductDetailInfo";
import "@/styles/index.scss";

const meta: Meta<typeof ProductDetailInfo> = {
  title: "Organisms/ProductDetailInfo",
  component: ProductDetailInfo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "One Life Graphic T-Shirt",
    rating: 4.5,
    currentPrice: 260,
    originalPrice: 300,
    discountPercentage: 40,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: [
      { id: "olive", name: "Olive Green", hex: "#4f4631" },
      { id: "teal", name: "Dark Teal", hex: "#314f4a" },
      { id: "navy", name: "Navy Blue", hex: "#31344f" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailInfo>;

export const Default: Story = {};
