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
