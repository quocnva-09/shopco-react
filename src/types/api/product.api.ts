import type { PaginationResponse, ApiResponse } from "./api";

export interface ProductCategoryApi {
  id: number;
  name: string;
  slug: string;
}

export interface ProductVariantColorApi {
  id: number;
  name: string;
  hex_code: string;
}

export interface ProductVariantSizeApi {
  id: number;
  name: string;
  label: string;
}

export interface ProductVariantApi {
  id: number;
  color: ProductVariantColorApi;
  size: ProductVariantSizeApi;
}

export interface ProductImageApi {
  id: number;
  product_id: number;
  img_path: string;
  alt: string;
  is_primary: number | boolean;
}

export interface ProductApi {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  price_discount: string | null;
  variants: ProductVariantApi[];
  is_active: boolean;
  rating_avg?: number;
  reviews_count?: number;
  sold_count?: number;
  created_at: string;
  updated_at: string;
  category: ProductCategoryApi;
  images: ProductImageApi[];
}

export interface ProductParams {
  search?: string;
  category_id?: number;
  colors?: string;
  sizes?: string;
  min_price?: number;
  max_price?: number;
  page?: number;
  per_page?: number;
  sort_by?: "price" | "created_at" | "name" | "selling";
  sort_dir?: "asc" | "desc";
}

export interface ProductListResponse extends PaginationResponse<ProductApi> {}

export interface ProductResponse extends ApiResponse<ProductApi> {}
