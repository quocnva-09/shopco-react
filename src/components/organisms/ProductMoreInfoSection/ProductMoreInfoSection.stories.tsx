import type { Meta, StoryObj } from "@storybook/react";
import { ProductMoreInfoSection } from "./ProductMoreInfoSection";
import { MOCK_REVIEWS } from "@/consts/productMoreInfoData";
import "@/styles/index.scss";

const meta: Meta<typeof ProductMoreInfoSection> = {
  title: "Organisms/ProductMoreInfoSection",
  component: ProductMoreInfoSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    productDescription:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    reviews: MOCK_REVIEWS,
    reviewCount: 120,
    faqContent:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductMoreInfoSection>;

export const Default: Story = {};
