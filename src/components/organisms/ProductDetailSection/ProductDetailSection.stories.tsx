import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetailSection } from "./ProductDetailSection";
import { MOCK_PRODUCT_DETAIL } from "@/consts/productDetailData";
import "@/styles/index.scss";

const meta: Meta<typeof ProductDetailSection> = {
  title: "Organisms/ProductDetailSection",
  component: ProductDetailSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    data: MOCK_PRODUCT_DETAIL,
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
type Story = StoryObj<typeof ProductDetailSection>;

export const Default: Story = {};
