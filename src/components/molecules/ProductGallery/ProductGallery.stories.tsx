import type { Meta, StoryObj } from "@storybook/react";
import { ProductGallery } from "./ProductGallery";
import "@/styles/index.scss";

const mockImages = [
  { id: 1, productId: 1, imgPath: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png", alt: "Product image 1", isPrimary: true },
  { id: 2, productId: 1, imgPath: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png", alt: "Product image 2", isPrimary: false },
  { id: 3, productId: 1, imgPath: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png", alt: "Product image 3", isPrimary: false },
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
