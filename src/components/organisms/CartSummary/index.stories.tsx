import type { Meta, StoryObj } from "@storybook/react";
import { CartSummary } from "./index";
import { MOCK_CART_SUMMARY } from "@/consts/cartData";
import "@/styles/index.scss";

const meta: Meta<typeof CartSummary> = {
  title: "Organisms/CartSummary",
  component: CartSummary,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    lineItems: MOCK_CART_SUMMARY.lineItems,
    total: MOCK_CART_SUMMARY.total,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CartSummary>;

export const Default: Story = {};

export const WithDiscount: Story = {
  args: {
    lineItems: [
      { label: "Subtotal", value: 565 },
      { label: "Discount (-20%)", value: -113, isDiscount: true },
      { label: "Delivery Fee", value: 15 },
    ],
    total: 467,
  },
};
