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

export interface ProductDetailData {
  id: number;
  name: string;
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
  images: ProductImage[];
  colors: ColorItem[];
  sizes: SizeItem[];
}

export interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceDiscount: number;
  sizes: string[];
  colors: string[];
  isActive: boolean;
  ratingAvg?: number;
  reviewsCount?: number;
  soldCount?: number;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  images: ProductImage[];
}
