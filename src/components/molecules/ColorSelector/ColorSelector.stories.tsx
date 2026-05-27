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
      { id: "olive", name: "Olive Green", hex: "#4f4631" },
      { id: "teal", name: "Dark Teal", hex: "#314f4a" },
      { id: "navy", name: "Navy Blue", hex: "#31344f" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ColorSelector>;

export const Default: Story = {};

export const ManyColors: Story = {
  args: {
    colors: [
      { id: "olive", name: "Olive Green", hex: "#4f4631" },
      { id: "teal", name: "Dark Teal", hex: "#314f4a" },
      { id: "navy", name: "Navy Blue", hex: "#31344f" },
      { id: "red", name: "Ruby Red", hex: "#c62828" },
      { id: "blue", name: "Royal Blue", hex: "#1565c0" },
      { id: "green", name: "Forest Green", hex: "#2e7d32" },
    ],
  },
};
