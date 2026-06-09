import type { Meta, StoryObj } from "@storybook/react";
import { QuantitySelector } from "./index";
import "@/styles/index.scss";

const meta: Meta<typeof QuantitySelector> = {
  title: "Molecules/QuantitySelector",
  component: QuantitySelector,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    defaultValue: 1,
  },
};

export default meta;
type Story = StoryObj<typeof QuantitySelector>;

export const Default: Story = {};
