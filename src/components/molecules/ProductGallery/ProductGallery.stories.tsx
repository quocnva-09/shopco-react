import type { Meta, StoryObj } from "@storybook/react";
import { ProductGallery } from "./ProductGallery";
import "@/styles/index.scss";

const mockImages = [
  { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
  { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
  { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
];

const meta: Meta<typeof ProductGallery> = {
  title: "Molecules/ProductGallery",
  component: ProductGallery,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    images: mockImages,
    productName: "One Life Graphic T-Shirt",
  },
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: "600px" }}>
      <ProductGallery {...args} />
    </div>
  ),
};
