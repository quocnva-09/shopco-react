import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import "@/styles/index.scss";

const productTabs = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
];

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    tabs: productTabs,
    activeTab: "reviews",
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};

export const ProfileVariant: Story = {
  args: {
    variant: "profile",
    tabs: [
      { id: "orders", label: "Orders" },
      { id: "settings", label: "Settings" },
      { id: "profile", label: "Profile" },
    ],
    activeTab: "orders",
  },
};
