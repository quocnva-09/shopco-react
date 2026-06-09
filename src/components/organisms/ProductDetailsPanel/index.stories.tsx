import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailsPanel } from "./index";
import "@/styles/index.scss";

const meta: Meta<typeof ProductDetailsPanel> = {
  title: "Organisms/ProductDetailsPanel",
  component: ProductDetailsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  },
};

export default meta;
type Story = StoryObj<typeof ProductDetailsPanel>;

export const Default: Story = {};
