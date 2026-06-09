import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./index";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "inline-radio",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    lineClamp: {
      control: { type: "number", min: 1, max: 5, step: 1 },
    },
    showTooltip: {
      control: "boolean",
    },
  },
  args: {
    as: "h3",
    lineClamp: 1,
    showTooltip: true,
    children: "This is a very very long product heading string to test the text truncation feature",
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// 1. Simulate a Product Card use case (truncate to 1 line with Tooltip)
export const ProductCardStyle: Story = {
  args: {
    as: "h3",
    lineClamp: 1,
    showTooltip: true,
  },
  render: (args) => (
    <div style={{ width: "200px", padding: "20px", border: "1px dashed #ccc" }}>
      <Heading {...args} />
    </div>
  ),
};

// 2. Simulate multi-line clamping (e.g. 2-line clamp for Blog)
export const MultiLineClamp: Story = {
  args: {
    as: "h2",
    lineClamp: 2,
    showTooltip: false,
    children: "Explore the latest streetwear collection launched this month with incredibly bold and unique designs.",
  },
  render: (args) => (
    <div style={{ width: "250px", padding: "20px", border: "1px dashed #ccc" }}>
      <Heading {...args} />
    </div>
  ),
};