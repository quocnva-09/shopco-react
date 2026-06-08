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
    sizes: [
      { id: 1, name: "S", label: "Small" },
      { id: 2, name: "M", label: "Medium" },
      { id: 3, name: "L", label: "Large" },
      { id: 4, name: "XL", label: "X-Large" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SizeSelector>;

export const Default: Story = {};

export const WithDefault: Story = {
  args: {
    defaultValue: 2, // id of "M"
  },
};
