import { MainLayout } from "@/components/templates/MainLayout";
import { ProductDetailSection } from "@/components/organisms/ProductDetailSection";
import { ProductMoreInfoSection } from "@/components/organisms/ProductMoreInfoSection";
import { ProductCollectionSection } from "@/components/organisms/ProductCollectionSection";
import { Breadcrumb } from "@/components/molecules/Breadcrumb";

import {
  MOCK_PRODUCT_DETAIL,
  MOCK_REVIEWS,
  MOCK_BREADCRUMB,
  MOCK_RELATED_PRODUCTS,
} from "@/consts/productDetailData";
import { Divider } from "@/components/atoms/Divider";

export const ProductDetailPage = () => {
  return (
    <MainLayout>
      <Divider direction="horizontal" />
      <Breadcrumb items={MOCK_BREADCRUMB} />
      <ProductDetailSection data={MOCK_PRODUCT_DETAIL} />
      <ProductMoreInfoSection
        reviewCount={MOCK_REVIEWS.length}
        reviews={MOCK_REVIEWS}
      />
      <ProductCollectionSection
        title="YOU MAY ALSO LIKE"
        products={MOCK_RELATED_PRODUCTS}
        showButton={false}
      />
    </MainLayout>
  );
};
