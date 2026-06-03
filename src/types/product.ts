import type { ProductCategory } from "./category";

export interface ProductCardData {
  id: number;
  name: string;
  primaryImage?: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
}

export interface ColorItem {
  color: string;
  hex: string;
}

export interface SizeItem {
  size: string;
  label: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imgPath: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  originalPrice?: number;
  currentPrice: number;
  discountPercent: number;
  sizes: SizeItem[];
  colors: ColorItem[];
  isActive: boolean;
  ratingAvg?: number;
  reviewsCount?: number;
  soldCount?: number;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  images: ProductImage[];
}
