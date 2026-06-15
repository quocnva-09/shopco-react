import { ProductService } from "@/services/product.service";
import { ReviewService } from "@/services/review.service";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { mapReviewData } from "@/utils/mappers/review.mapper";
import type { ProductCardData } from "@/types/product";
import type { ReviewData } from "@/types/review";

export interface HomeLoaderData {
  newArrivals: Promise<ProductCardData[]>;
  topSellings: Promise<ProductCardData[]>;
  reviews: Promise<ReviewData[]>;
}

export const homeLoader = (): HomeLoaderData => {
  const newArrivals = ProductService.getProducts({
    sort_by: "created_at",
    sort_dir: "desc",
    per_page: 4,
  }).then((res) => res.data.map(mapProductCardData));

  const topSellings = ProductService.getProducts({
    sort_by: "selling",
    sort_dir: "desc",
    per_page: 4,
  }).then((res) => res.data.map(mapProductCardData));

  const reviews = ReviewService.getReviews({
    sort_by: "rating",
    sort_dir: "desc",
    limit: 8,
  }).then((res) => res.data.map(mapReviewData));

  return { newArrivals, topSellings, reviews };
};
