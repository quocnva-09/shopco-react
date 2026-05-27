// Homepage mock data — tập trung tất cả static data cho Home page
import type { StatItemData } from "@/components/molecules/StatsBar";
import type { ProductCardData } from "@/components/molecules/ProductCard";

// ──────────── Banner Section ────────────

export const HERO_TITLE = "FIND CLOTHES THAT MATCHES YOUR STYLE";
export const HERO_DESCRIPTION =
  "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.";
export const HERO_CTA = "Shop Now";

export const HERO_IMAGE = {
  src: "main-img.jpg",
  alt: "Fashion model wearing SHOP.CO collection",
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
];

export const TOP_SELLING: ProductCardData[] = [
  {
    id: "ts-1",
    name: "Vertical Striped Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 212,
    originalPrice: 232,
    discountPercentage: 9,
    rating: 5.0,
  },
  {
    id: "ts-2",
    name: "Courage Graphic T-Shirt",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 145,
    rating: 4.0,
  },
  {
    id: "ts-3",
    name: "Loose Fit Bermuda Shorts",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 80,
    rating: 3.0,
  },
  {
    id: "ts-4",
    name: "Faded Skinny Jeans",
    primaryImage: PRODUCT_IMAGE,
    currentPrice: 210,
    rating: 4.5,
  },
];
