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
  id: number;
  name: string;
  hexCode: string;
}

export interface SizeItem {
  id: number;
  name: string;
  label: string;
}

export interface ProductVariant {
  id: number;
  color: ColorItem;
  size: SizeItem;
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
  variants: ProductVariant[];
  isActive: boolean;
  ratingAvg?: number;
  reviewsCount?: number;
  soldCount?: number;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  images: ProductImage[];
}
