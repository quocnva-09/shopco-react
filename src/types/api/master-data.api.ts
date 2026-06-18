import type { ApiResponse } from "./api";

export interface CategoryApi {
  id: number;
  name: string;
  slug: string;
}

export interface ColorApi {
  id: number;
  name: string;
  hex_code: string;
}

export interface SizeApi {
  id: number;
  name: string;
  label: string;
}

export interface StyleApi {
  id: number;
  name: string;
  slug: string;
}

export type CategoriesResponse = ApiResponse<CategoryApi[]>;
export type ColorsResponse = ApiResponse<ColorApi[]>;
export type SizesResponse = ApiResponse<SizeApi[]>;
export type StylesResponse = ApiResponse<StyleApi[]>;
