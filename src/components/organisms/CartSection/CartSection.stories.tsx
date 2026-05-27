import type { Meta, StoryObj } from "@storybook/react";
import { CartSection } from "./CartSection";
import { MOCK_CART_ITEMS, MOCK_CART_SUMMARY } from "@/consts/cartData";
import "@/styles/index.scss";

const meta: Meta<typeof CartSection> = {
  title: "Organisms/CartSection",
  component: CartSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    items: MOCK_CART_ITEMS,
    summary: MOCK_CART_SUMMARY,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CartSection>;

export const Default: Story = {};
