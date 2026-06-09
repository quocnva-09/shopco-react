import { useCallback, useMemo, useState } from "react";
import "./index.scss";
import { ProductDetailSection } from "@/components/organisms/ProductDetailSection";
import { ProductMoreInfoSection } from "@/components/organisms/ProductMoreInfoSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { SectionStateWrapper } from "@/components/molecules/SectionStateWrapper";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useParams } from "react-router-dom";
import { useProductCollection } from "@/hooks/useProductCollection";
import { useReviews } from "@/hooks/useReviews";
import { useProduct } from "@/hooks/useProduct";
import {
  SORT_ORDER,
  DEFAULT_SORT_ORDER,
  type SortOrder,
  type RatingFilter,
} from "@/consts/reviewFilters";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);
  const [ratingFilter, setRatingFilter] = useState<RatingFilter | null>(null);

  const handleSortChange = useCallback((order: SortOrder) => {
    setSortOrder(order);
  }, []);

  const handleRatingFilterChange = useCallback(
    (rating: RatingFilter | null) => {
      setRatingFilter((prev) => (prev === rating ? null : rating));
    },
    [],
  );

  const {
    product,
    isLoading: isLoadingProduct,
    error: productError,
    isRetryable: productRetryable,
    retry: retryProduct,
  } = useProduct(Number(id));

  const {
    products: relatedProducts,
    isLoading: isLoadingRelatedProducts,
    error: relatedError,
    isRetryable: relatedRetryable,
    retry: retryRelated,
  } = useProductCollection(
    { category_id: product?.category?.id, per_page: 8 },
    { enabled: !isLoadingProduct && Boolean(product?.category?.id) },
  );

  const {
    reviews,
    totalCount,
    hasMore,
    isLoading: isLoadingReviews,
    isLoadingMore: isLoadingMoreReviews,
    error: reviewsError,
    isRetryable: reviewsRetryable,
    retry: retryReviews,
    loadMore: loadMoreReviews,
  } = useReviews(
    {
      product_id: Number(id),
      is_approved: true,
      limit: 6,
      sort_by: "created_at",
      sort_dir: sortOrder === SORT_ORDER.LATEST ? "desc" : "asc",
    },
    { enableLoadMore: true },
  );

  const filteredReviews = useMemo(
    () =>
      ratingFilter != null
        ? reviews.filter((r) => Math.floor(r.rating) === ratingFilter)
        : reviews,
    [reviews, ratingFilter],
  );

  const baseBreadcrumbs = useBreadcrumbs();
  const breadcrumbs = useMemo(
    () => [...baseBreadcrumbs, { label: product?.name || "Product Detail" }],
    [baseBreadcrumbs, product?.name],
  );

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />

      <SectionStateWrapper
        isLoading={isLoadingProduct}
        loadingMessage="Loading product..."
        error={productError}
        isRetryable={productRetryable}
        onRetry={retryProduct}
      >
        {product && <ProductDetailSection data={product} />}
      </SectionStateWrapper>

      {/* Reviews */}
      <SectionStateWrapper
        isLoading={isLoadingReviews}
        loadingMessage="Loading reviews..."
        error={reviewsError}
        isRetryable={reviewsRetryable}
        onRetry={retryReviews}
      >
        <ProductMoreInfoSection
          reviewCount={totalCount}
          reviews={filteredReviews}
          hasMore={hasMore}
          isLoadingMore={isLoadingMoreReviews}
          onLoadMore={loadMoreReviews}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          ratingFilter={ratingFilter}
          onRatingFilterChange={handleRatingFilterChange}
        />
      </SectionStateWrapper>

      {/* Related products */}
      <SectionStateWrapper
        isLoading={isLoadingRelatedProducts}
        loadingMessage="Loading related products..."
        error={relatedError}
        isRetryable={relatedRetryable}
        onRetry={retryRelated}
      >
        <ProductCollectionSection
          title="YOU MAY ALSO LIKE"
          products={relatedProducts}
          showButton={false}
          className="product-page__product-collections"
          showArrows={true}
          autoplay={true}
        />
      </SectionStateWrapper>
    </main>
  );
};
