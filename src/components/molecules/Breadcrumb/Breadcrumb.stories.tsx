import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./Breadcrumb";
import "@/styles/index.scss";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// 1. Default — 4 levels (matches original HTML)
export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop/men" },
      { label: "T-shirts" },
    ],
  },
};

// 2. Two Levels — minimal breadcrumb
export const TwoLevels: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Shop" }],
  },
};

// 3. Long Path — deep navigation
export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Men", href: "/shop/men" },
      { label: "Clothing", href: "/shop/men/clothing" },
      { label: "T-shirts", href: "/shop/men/clothing/t-shirts" },
      { label: "One Life Graphic T-Shirt" },
    ],
  },
};
