import type { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";
import { MOCK_CART_ITEMS } from "@/consts/cartData";
import "@/styles/index.scss";

const meta: Meta<typeof CartItem> = {
  title: "Molecules/CartItem",
  component: CartItem,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    item: MOCK_CART_ITEMS[0],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Default: Story = {};

export const LongName: Story = {
  args: {
    item: {
      ...MOCK_CART_ITEMS[0],
      name: "Gradient Graphic T-shirt Gradient Graphic T-shirt Gradient Graphic T-shirt",
    },
  },
};
