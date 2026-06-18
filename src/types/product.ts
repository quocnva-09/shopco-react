import type { ProductCategory } from "./category";
import type { ColorItem } from "./color";
import type { SizeItem } from "./size";
import type { StyleItem } from "./style";

export interface ProductCardData {
  id: number;
  name: string;
  primaryImage?: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
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
  styles: StyleItem[];
}
