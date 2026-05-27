import type { Meta, StoryObj } from "@storybook/react";
import { ProductFaqsPanel } from "./ProductFaqsPanel";
import "@/styles/index.scss";

const meta: Meta<typeof ProductFaqsPanel> = {
  title: "Organisms/ProductFaqsPanel",
  component: ProductFaqsPanel,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export default meta;
type Story = StoryObj<typeof ProductFaqsPanel>;

export const Default: Story = {};
