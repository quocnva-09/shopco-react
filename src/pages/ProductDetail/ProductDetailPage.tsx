import { useCallback, useMemo, useState } from "react";
import { ProductDetailSection } from "@/components/organisms/ProductDetailSection";
import { ProductMoreInfoSection } from "@/components/organisms/ProductMoreInfoSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { Divider } from "@/components/atoms/Divider";
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

  const handleRatingFilterChange = useCallback((rating: RatingFilter | null) => {
    setRatingFilter((prev) => (prev === rating ? null : rating));
  }, []);

  const { product, isLoading: isLoadingProduct } = useProduct(Number(id));

  const { products: relatedProducts, isLoading: isLoadingRelatedProducts } =
    useProductCollection(
      { category_id: product?.category?.id, per_page: 8 },
      { enabled: !isLoadingProduct && Boolean(product?.category?.id) },
    );

  const { reviews, isLoading: isLoadingReviews } = useReviews({
    product_id: Number(id),
    is_approved: true,
    limit: 8,
    sort_by: "created_at",
    sort_dir: sortOrder === SORT_ORDER.LATEST ? "desc" : "asc",
  });

  // Client-side filter: lọc theo rating trên dữ liệu đã load
  const filteredReviews = useMemo(
    () =>
      ratingFilter != null
        ? reviews.filter((r) => Math.floor(r.rating) === ratingFilter)
        : reviews,
    [reviews, ratingFilter],
  );

  const baseBreadcrumbs = useBreadcrumbs();
  const breadcrumbs = useMemo(
    () => [
      ...baseBreadcrumbs,
      { label: product?.name || "Product Detail" },
    ],
    [baseBreadcrumbs, product?.name],
  );

  return (
    <>
      <main className="container">
        <Divider direction="horizontal" />
        <Breadcrumb items={breadcrumbs} />
        {isLoadingProduct ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading product...
          </div>
        ) : product ? (
          <ProductDetailSection data={product} />
        ) : (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading product...
          </div>
        )}
        {isLoadingReviews ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading reviews...
          </div>
        ) : (
          <ProductMoreInfoSection
            reviewCount={filteredReviews.length}
            reviews={filteredReviews}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            ratingFilter={ratingFilter}
            onRatingFilterChange={handleRatingFilterChange}
          />
        )}

        {isLoadingRelatedProducts ? (
          <div style={{ padding: "4rem 0", textAlign: "center" }}>
            Loading related products...
          </div>
        ) : (
          <ProductCollectionSection
            title="YOU MAY ALSO LIKE"
            products={relatedProducts}
            showButton={false}
          />
        )}
      </main>
    </>
  );
};
