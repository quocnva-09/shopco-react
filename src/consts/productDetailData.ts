import type { ProductImage } from "@/components/molecules/ProductGallery";
import type { ColorItem } from "@/components/molecules/ColorSelector";

export interface ProductDetailData {
  id: string | number;
  name: string;
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
  images: ProductImage[];
  colors: ColorItem[];
  sizes: string[];
}

export const MOCK_PRODUCT_DETAIL: ProductDetailData = {
  id: "product-1",
  name: "One Life Graphic T-Shirt",
  rating: 4.5,
  currentPrice: 260,
  originalPrice: 300,
  discountPercentage: 40,
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  images: [
    { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
    { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
    { img_path: "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png" },
  ],
  colors: [
    { id: "olive", name: "Olive Green", hex: "#4f4631" },
    { id: "teal", name: "Dark Teal", hex: "#314f4a" },
    { id: "navy", name: "Navy Blue", hex: "#31344f" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
};
