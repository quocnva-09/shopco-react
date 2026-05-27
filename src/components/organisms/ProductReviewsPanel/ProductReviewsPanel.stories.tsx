import type { Meta, StoryObj } from "@storybook/react";
import { ProductReviewsPanel } from "./ProductReviewsPanel";
import { MOCK_REVIEWS } from "@/consts/productMoreInfoData";
import "@/styles/index.scss";
import "@/components/atoms/Tooltip";

const meta: Meta<typeof ProductReviewsPanel> = {
  title: "Organisms/ProductReviewsPanel",
  component: ProductReviewsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    reviews: MOCK_REVIEWS,
    reviewCount: 120,
  },
};

export default meta;
type Story = StoryObj<typeof ProductReviewsPanel>;

export const Default: Story = {};
