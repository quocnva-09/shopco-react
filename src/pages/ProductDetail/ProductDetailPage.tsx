import { ProductDetailSection } from "@/components/organisms/ProductDetailSection";
import { ProductMoreInfoSection } from "@/components/organisms/ProductMoreInfoSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

import { Divider } from "@/components/atoms/Divider";
import type { ProductCardData, ProductDetailData } from "@/types/product";
import { useState, useEffect } from "react";
import { ProductService } from "@/services/product.service";
import {
  mapProductCardData,
  mapProductDetailData,
} from "@/utils/mappers/product.mapper";
import { useParams } from "react-router-dom";
import type { ReviewData } from "@/types/review";
import { ReviewService } from "@/services/review.service";
import { mapReviewData } from "@/utils/mappers/review.mapper";

export const ProductDetailPage = () => {
  const breadcrumbs = useBreadcrumbs();
  const [product, setProduct] = useState<ProductDetailData>();
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);
  const [isLoadingRelatedProducts, setIsLoadingRelatedProducts] =
    useState<boolean>(true);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const response = await ProductService.getProductById(Number(id));
        setProduct(mapProductDetailData(response.data));
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const fetchRelatedProducts = async () => {
      setIsLoadingRelatedProducts(true);
      try {
        const response = await ProductService.getProducts({
          category_id: product.categoryId,
          per_page: 8,
        });
        const mappedData = response.data.map(mapProductCardData);
        setRelatedProducts(mappedData);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoadingRelatedProducts(false);
      }
    };
    fetchRelatedProducts();
  }, [product]);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      try {
        const response = await ReviewService.getReviewsByProductId(Number(id));

        const mappedData = response.data.map(mapReviewData);
        setReviews(mappedData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [id]);

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
