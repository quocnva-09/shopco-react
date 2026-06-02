import { useMemo } from "react";
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

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

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
  });

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
            reviewCount={reviews.length}
            reviews={reviews}
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
