import type { ProductCardData } from "@/types/product";
// Homepage mock data — tập trung tất cả static data cho Home page
import type { StatItemData } from "@/components/molecules/StatsBar";

// ──────────── Banner Section ────────────

export const HERO_TITLE = "FIND CLOTHES THAT MATCHES YOUR STYLE";
export const HERO_DESCRIPTION =
  "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.";
export const HERO_CTA = "Shop Now";

export const HERO_IMAGE = {
  src: "main-img.jpg",
  alt: "Fashion model wearing SHOP.CO collection",
};

export const HERO_EFFECTS = {
  src: "images/banner-effect.svg",
  alt: "Banner effect",
};

export const HERO_STATS: StatItemData[] = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

// ──────────── Product Collections ────────────

const PRODUCT_IMAGE =
  "https://shopco-s3.s3.ap-southeast-1.amazonaws.com/products/0yovdzFcT4SEbA2TTzBB98x3tmrfo4Ec43K88WZ4.png";

export const NEW_ARRIVALS: ProductCardData[] = [
  {
    id: 1,
    name: "T-Shirt With Tape Details",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 120,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 240,
    originalPrice: 260,
    discountPercentage: 8,
    rating: 3.5,
  },
  {
    id: 3,
    name: "Checkered Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 180,
    rating: 4.0,
  },
  {
    id: 4,
    name: "Sleeve Striped T-Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 130,
    originalPrice: 160,
    discountPercentage: 19,
    rating: 4.5,
  },
];

export const TOP_SELLING: ProductCardData[] = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 212,
    originalPrice: 232,
    discountPercentage: 9,
    rating: 5.0,
  },
  {
    id: 6,
    name: "Courage Graphic T-Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 145,
    rating: 4.0,
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 80,
    rating: 3.0,
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 210,
    rating: 4.5,
  },
];
