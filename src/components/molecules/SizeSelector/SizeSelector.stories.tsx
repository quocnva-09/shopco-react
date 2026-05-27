import type { Meta, StoryObj } from "@storybook/react";
import { SizeSelector } from "./SizeSelector";
import "@/styles/index.scss";

const meta: Meta<typeof SizeSelector> = {
  title: "Molecules/SizeSelector",
  component: SizeSelector,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "size",
    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
};

export default meta;
type Story = StoryObj<typeof SizeSelector>;

export const Default: Story = {};

export const WithDefault: Story = {
  args: {
    defaultValue: "Medium",
  },
};
