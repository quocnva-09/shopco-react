import type { Meta, StoryObj } from "@storybook/react";
import { ReviewsHeader } from "./ReviewsHeader";
import "@/styles/index.scss";

const meta: Meta<typeof ReviewsHeader> = {
  title: "Molecules/ReviewsHeader",
  component: ReviewsHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    reviewCount: 120,
  },
};

export default meta;
type Story = StoryObj<typeof ReviewsHeader>;

export const Default: Story = {};
