import type { Meta, StoryObj } from "@storybook/react";
import { ColorSelector } from "./ColorSelector";
import "@/styles/index.scss";

const meta: Meta<typeof ColorSelector> = {
  title: "Molecules/ColorSelector",
  component: ColorSelector,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    name: "color",
    colors: [
      { color: "olive", hex: "#4f4631" },
      { color: "teal", hex: "#314f4a" },
      { color: "navy", hex: "#31344f" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ColorSelector>;

export const Default: Story = {};

export const ManyColors: Story = {
  args: {
    colors: [
      { color: "olive", hex: "#4f4631" },
      { color: "teal", hex: "#314f4a" },
      { color: "navy", hex: "#31344f" },
      { color: "red", hex: "#c62828" },
      { color: "blue", hex: "#1565c0" },
      { color: "green", hex: "#2e7d32" },
    ],
  },
};
