import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ProductGallery } from "@/components/molecules/ProductGallery";
import { ProductDetailInfo } from "@/components/organisms/ProductDetailInfo";
import type { ProductDetailData } from "@/consts/productDetailData";
import "./ProductDetailSection.scss";

export interface ProductDetailSectionProps
  extends ComponentPropsWithoutRef<"section"> {
  data: ProductDetailData;
}

export const ProductDetailSection = ({
  data,
  className,
  ...rest
}: ProductDetailSectionProps) => {
  const {
    name,
    rating,
    currentPrice,
    originalPrice,
    discountPercentage,
    description,
    images,
    colors,
    sizes,
  } = data;

  return (
    <section className={clsx("product-detail", className)} {...rest}>
      <ProductGallery images={images} productName={name} />
      <ProductDetailInfo
        name={name}
        rating={rating}
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
        description={description}
        colors={colors}
        sizes={sizes}
      />
    </section>
  );
};
