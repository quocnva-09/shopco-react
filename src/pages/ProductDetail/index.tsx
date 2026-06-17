import { useCallback, useMemo, useState, Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import "./index.scss";
import { ProductGallery } from "@/components/molecules/ProductGallery";
import { ProductGallerySkeleton } from "@/components/molecules/ProductGallerySkeleton";
import { ProductDetailInfo } from "@/components/organisms/ProductDetailInfo";
import { ProductDetailInfoSkeleton } from "@/components/organisms/ProductDetailInfoSkeleton";
import { ProductMoreInfoSection } from "@/components/organisms/ProductMoreInfoSection";
import { ProductDetailsPanel } from "@/components/organisms/ProductDetailsPanel";
import { ProductReviewsPanel } from "@/components/organisms/ProductReviewsPanel";
import { ProductFaqsPanel } from "@/components/organisms/ProductFaqsPanel";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { ProductCard } from "@/components/molecules/ProductCard";
import { ProductCardSkeleton } from "@/components/molecules/ProductCardSkeleton";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { SectionStateWrapper } from "@/components/molecules/SectionStateWrapper";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { useParams } from "react-router-dom";
import { useProductCollection } from "@/hooks/useProductCollection";
import { useReviews } from "@/hooks/useReviews";
import type { ProductData } from "@/types/product";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import {
  SORT_ORDER,
  DEFAULT_SORT_ORDER,
  type SortOrder,
  type RatingFilter,
} from "@/consts/reviewFilters";
import {
  PRODUCT_DETAIL_RELATED_PER_PAGE,
  PRODUCT_DETAIL_REVIEWS_LIMIT,
} from "@/consts/config";

import type { ProductDetailLoaderData } from "./loader";

// Utility component to render a list of skeletons
const ProductCardSkeletonList = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className="product-collection__item">
        <ProductCardSkeleton />
      </li>
    ))}
  </>
);

export const ProductDetailPage = () => {
  const { product } = useLoaderData() as ProductDetailLoaderData;

  return (
    <ErrorBoundary className="error-boundary--center">
      <Suspense
        fallback={
          <main className="container">
            <Breadcrumb items={[]} />
            <div className="product-detail">
              <ProductGallerySkeleton />
              <ProductDetailInfoSkeleton />
            </div>
          </main>
        }
      >
        <Await resolve={product}>
          {(resolvedProduct) => (
            <ProductDetailContent product={resolvedProduct} />
          )}
        </Await>
      </Suspense>
    </ErrorBoundary>
  );
};

const ProductDetailContent = ({ product }: { product: ProductData }) => {
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
    products: relatedProducts,
    isLoading: isLoadingRelatedProducts,
    error: relatedError,
    isRetryable: relatedRetryable,
    retry: retryRelated,
  } = useProductCollection(
    {
      category_id: product?.category?.id,
      per_page: PRODUCT_DETAIL_RELATED_PER_PAGE,
    },
    { enabled: Boolean(product?.category?.id) },
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
      limit: PRODUCT_DETAIL_REVIEWS_LIMIT,
      sort_by: "created_at",
      sort_dir: sortOrder === SORT_ORDER.LATEST ? "desc" : "asc",
      rating: ratingFilter ?? undefined,
    },
    { enableLoadMore: true },
  );

  const baseBreadcrumbs = useBreadcrumbs();
  const breadcrumbs = useMemo(
    () => [...baseBreadcrumbs, { label: product?.name || "Product Detail" }],
    [baseBreadcrumbs, product?.name],
  );

  return (
    <main className="container">
      <Breadcrumb items={breadcrumbs} />

      <div className="product-detail">
        <ProductGallery
          key={product.id}
          images={product.images}
          productName={product.name}
        />
        <ProductDetailInfo product={product}>
          <ProductDetailInfo.Header
            name={product.name}
            ratingAvg={product.ratingAvg}
          />
          <ProductDetailInfo.Price
            currentPrice={product.currentPrice}
            originalPrice={product.originalPrice}
            discountPercent={product.discountPercent}
          />
          {product.description && (
            <ProductDetailInfo.Description>
              {product.description}
            </ProductDetailInfo.Description>
          )}
          <ProductDetailInfo.Form>
            <ProductDetailInfo.ColorSelection />
            <ProductDetailInfo.SizeSelection />
            <ProductDetailInfo.Actions />
          </ProductDetailInfo.Form>
        </ProductDetailInfo>
      </div>

      {/* More Info Tabs */}
      <ProductMoreInfoSection
        detailsPanel={
          <ProductDetailsPanel description={product?.description || ""} />
        }
        faqsPanel={<ProductFaqsPanel content={""} />}
        reviewsPanel={
          <ProductReviewsPanel
            productId={Number(id)}
            reviewCount={totalCount}
            reviews={reviews}
            hasMore={hasMore}
            isLoading={isLoadingReviews}
            isLoadingMore={isLoadingMoreReviews}
            error={reviewsError}
            isRetryable={reviewsRetryable}
            onRetry={retryReviews}
            onLoadMore={loadMoreReviews}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            ratingFilter={ratingFilter}
            onRatingFilterChange={handleRatingFilterChange}
          />
        }
      />

      {/* Related products */}
      <SectionStateWrapper
        error={relatedError}
        isRetryable={relatedRetryable}
        onRetry={retryRelated}
      >
        <ProductCollectionSection
          className="product-page__product-collections"
          showButton={false}
        >
          <ProductCollectionSection.Header title="YOU MIGHT ALSO LIKE" />
          <ProductCollectionSection.Content
            enableSlider={true}
            showArrows={true}
            autoplay={true}
          >
            {isLoadingRelatedProducts ? (
              <ProductCardSkeletonList count={4} />
            ) : (
              relatedProducts.map((p) => (
                <li key={p.id} className="product-collection__item">
                  <ProductCard product={p} />
                </li>
              ))
            )}
          </ProductCollectionSection.Content>
        </ProductCollectionSection>
      </SectionStateWrapper>
    </main>
  );
};
