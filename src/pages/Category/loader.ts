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
  }>;
  masterData: Promise<[CategoryApi[], ColorApi[], SizeApi[], StyleApi[]]>;
  sortData: typeof SORT_OPTIONS;
}

export const categoryLoader = ({
  request,
}: LoaderFunctionArgs): CategoryLoaderData => {
  const url = new URL(request.url);

  // Extract pagination and sort
  const page = Number(url.searchParams.get("page")) || 1;
  const per_page = 9;
  // Map single sort string to sort_by and sort_dir
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

  // Extract filters
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

  const productsPromise = ProductService.getProducts({
    page,
    per_page,
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
