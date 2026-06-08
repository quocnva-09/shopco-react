import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  // Provides a UI for clicking to choose colors and rename SVGs directly in Storybook
  argTypes: {
    color: { control: "color" },
    variant: {
      control: "select",
      options: ["default", "ghost", "circular"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Scenario 1: Test default button style
export const Default: Story = {
  args: {
    svgName: "icn-cart",
    "aria-label": "Shopping cart",
    variant: "default",
  },
};

// Scenario 2: Test Ghost button style (Close X button)
export const GhostClose: Story = {
  args: {
    svgName: "icn-close",
    "aria-label": "Close notification",
    variant: "ghost",
  },
};

// Scenario 3: Test circular button style
export const CircularFilter: Story = {
  args: {
    svgName: "icn-filter",
    "aria-label": "Filter",
    variant: "circular",
  },
};

export const Social: Story = {
  args: {
    svgName: "icn-github",
    "aria-label": "User profile",
    variant: "social",
  },
};
