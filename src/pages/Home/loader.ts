import { ProductService } from "@/services/product.service";
import { ReviewService } from "@/services/review.service";
import { MasterDataService } from "@/services/master-data.service";
import type { StyleApi } from "@/types/api/master-data.api";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { mapReviewData } from "@/utils/mappers/review.mapper";
import type { ProductCardData } from "@/types/product";
import type { ReviewData } from "@/types/review";
import { HOME_PRODUCTS_PER_PAGE, HOME_REVIEWS_LIMIT } from "@/consts/config";

export interface HomeLoaderData {
  newArrivals: Promise<ProductCardData[]>;
  topSellings: Promise<ProductCardData[]>;
  reviews: Promise<ReviewData[]>;
  styles: Promise<StyleApi[]>;
}

export const homeLoader = (): HomeLoaderData => {
  const newArrivals = ProductService.getProducts({
    sort_by: "created_at",
    sort_dir: "desc",
    per_page: HOME_PRODUCTS_PER_PAGE,
  }).then((res) => res.data.map(mapProductCardData));

  const topSellings = ProductService.getProducts({
    sort_by: "selling",
    sort_dir: "desc",
    per_page: HOME_PRODUCTS_PER_PAGE,
  }).then((res) => res.data.map(mapProductCardData));

  const reviews = ReviewService.getReviews({
    sort_by: "rating",
    sort_dir: "desc",
    limit: HOME_REVIEWS_LIMIT,
  }).then((res) => res.data.map(mapReviewData));

  const styles = MasterDataService.getStyles().then((res) => res.data);

  return { newArrivals, topSellings, reviews, styles };
};
