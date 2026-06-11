
import { ProductService } from "@/services/product.service";
import { ReviewService } from "@/services/review.service";
import { mapProductCardData } from "@/utils/mappers/product.mapper";
import { mapReviewData } from "@/utils/mappers/review.mapper";

export const homeLoader = () => {
  const newArrivalsPromise = ProductService.getProducts({
    sort_by: "created_at",
    sort_dir: "desc",
    per_page: 4,
  }).then((res) => res.data.map(mapProductCardData));

  const topSellingsPromise = ProductService.getProducts({
    sort_by: "selling",
    sort_dir: "desc",
    per_page: 4,
  }).then((res) => res.data.map(mapProductCardData));

  const reviewsPromise = ReviewService.getReviews({
    sort_by: "rating",
    sort_dir: "desc",
    limit: 8,
  }).then((res) => res.data.map(mapReviewData));

  return {
    newArrivals: newArrivalsPromise,
    topSellings: topSellingsPromise,
    reviews: reviewsPromise,
  };
};
