import type { LoaderFunctionArgs } from "react-router-dom";
import { ProductService } from "@/services/product.service";
import { MasterDataService } from "@/services/master-data.service";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import type { ProductCardData } from "@/types/product";
import type {
  ColorApi,
  SizeApi,
  StyleApi,
  CategoryApi,
} from "@/types/api/master-data.api";
import {
  CATEGORY_PER_PAGE_DESKTOP,
} from "@/consts/config";
import { getResponsivePerPage } from "@/hooks/useResponsivePagination";

export const SORT_OPTIONS = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export interface CategoryLoaderData {
  products: Promise<{
    data: ProductCardData[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
  }>;
  masterData: Promise<[CategoryApi[], ColorApi[], SizeApi[], StyleApi[]]>;
  sortData: typeof SORT_OPTIONS;
}

export const categoryLoader = ({
  request,
}: LoaderFunctionArgs): CategoryLoaderData => {
  const url = new URL(request.url);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const page = Number(url.searchParams.get("page")) || 1;

  // Read per_page from URL (single source of truth).
  // On initial visit (no param yet), detect viewport via matchMedia
  // so the very first API call already uses the correct per_page — no
  // double-fetch needed.
  const perPageParam = url.searchParams.get("per_page");
  const per_page = perPageParam
    ? Number(perPageParam)
    : getResponsivePerPage();

  // Clamp to allowed values as a safety net
  const safePer_page = [6, 9].includes(per_page)
    ? per_page
    : CATEGORY_PER_PAGE_DESKTOP;

  // ── Sort ─────────────────────────────────────────────────────────────────────
  const sortParam = url.searchParams.get("sort_by") || "popular";
  let sortBy: "price" | "created_at" | "selling" | undefined;
  let sortDir: "asc" | "desc" | undefined;

  switch (sortParam) {
    case "newest":
      sortBy = "created_at";
      sortDir = "desc";
      break;
    case "price-asc":
      sortBy = "price";
      sortDir = "asc";
      break;
    case "price-desc":
      sortBy = "price";
      sortDir = "desc";
      break;
    case "popular":
    default:
      sortBy = "selling";
      sortDir = "desc";
      break;
  }

  // ── Filters ──────────────────────────────────────────────────────────────────
  const category_slug = url.searchParams.get("category_slug") || undefined;
  const colorsParam = url.searchParams.get("colors");
  const colors = colorsParam ? colorsParam.split(",") : undefined;

  const sizesParam = url.searchParams.get("sizes");
  const sizes = sizesParam ? sizesParam.split(",") : undefined;

  const stylesParam = url.searchParams.get("style_slugs");
  const style_slugs = stylesParam ? stylesParam.split(",") : undefined;

  const minPriceParam = url.searchParams.get("min_price");
  const min_price = minPriceParam ? Number(minPriceParam) : undefined;

  const maxPriceParam = url.searchParams.get("max_price");
  const max_price = maxPriceParam ? Number(maxPriceParam) : undefined;

  // ── API call ─────────────────────────────────────────────────────────────────
  const productsPromise = ProductService.getProducts({
    page,
    per_page: safePer_page,
    sort_by: sortBy,
    sort_dir: sortDir,
    category_slug,
    colors,
    sizes,
    style_slugs,
    min_price,
    max_price,
  }).then((res) => ({
    data: res.data.map(mapProductCardData),
    total: res.meta?.total || 0,
    currentPage: res.meta?.current_page || 1,
    lastPage: res.meta?.last_page || 1,
    perPage: safePer_page,
  }));

  const masterDataPromise = Promise.all([
    MasterDataService.getCategories(true).then((res) => res.data),
    MasterDataService.getColors().then((res) => res.data),
    MasterDataService.getSizes().then((res) => res.data),
    MasterDataService.getStyles().then((res) => res.data),
  ]);

  return {
    products: productsPromise,
    masterData: masterDataPromise,
    sortData: SORT_OPTIONS,
  };
};
