import type { ProductImage } from "@/components/molecules/ProductGallery";
import type { ColorItem } from "@/components/molecules/ColorSelector";
import type { ReviewData } from "@/components/molecules/ReviewCard";
import type { ProductCardData } from "@/components/molecules/ProductCard";
import type { BreadcrumbItem } from "@/components/molecules/Breadcrumb";

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

export const MOCK_BREADCRUMB: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Category", href: "/category" },
  { label: "Product", href: "/product" },
  { label: "T-Shirt", href: "#" },
];

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

export const MOCK_REVIEWS: ReviewData[] = [
  {
    id: "review-1",
    name: "Samantha D.",
    rating: 4.5,
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "on August 14, 2025",
    isVerified: true,
  },
  {
    id: "review-2",
    name: "Alex M.",
    rating: 4,
    comment:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "on August 15, 2025",
    isVerified: true,
  },
  {
    id: "review-3",
    name: "Ethan R.",
    rating: 3.5,
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is bytes. I've received so many compliments wearing it. Googly recommend!",
    date: "on August 16, 2025",
    isVerified: false,
  },
  {
    id: "review-4",
    name: "Olivia P.",
    rating: 4,
    comment:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also makes for a fashionable statement. The게 게 게 attention to detail in the design is remarkable.",
    date: "on August 17, 2025",
    isVerified: true,
  },
  {
    id: "review-5",
    name: "Liam K.",
    rating: 4,
    comment:
      "This t-shirt is a fusion of comfort and creativity. The design is a reflection of my passion for both art and technology. It's an essential addition to my wardrobe!",
    date: "on August 18, 2025",
    isVerified: true,
  },
  {
    id: "review-6",
    name: "Ava H.",
    rating: 4.5,
    comment:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "on August 19, 2025",
    isVerified: true,
  },
];

const PRODUCT_IMAGE =
  "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png";

export const MOCK_RELATED_PRODUCTS: ProductCardData[] = [
  {
    id: "na-1",
    name: "T-Shirt With Tape Details",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 120,
    rating: 4.5,
  },
  {
    id: "na-2",
    name: "Skinny Fit Jeans",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 240,
    originalPrice: 260,
    discountPercentage: 8,
    rating: 3.5,
  },
  {
    id: "na-3",
    name: "Checkered Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 180,
    rating: 4.0,
  },
  {
    id: "na-4",
    name: "Sleeve Striped T-Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 19,
    rating: 4.5,
  },
  {
    id: "na-5",
    name: "Sleeve Striped T-Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 19,
    rating: 4.5,
  },
];
