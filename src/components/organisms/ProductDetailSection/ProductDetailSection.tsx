import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ProductGallery } from "@/components/molecules/ProductGallery";
import { ProductDetailInfo } from "@/components/organisms/ProductDetailInfo";
import type { ProductDetailData } from "@/types/product";
import "./ProductDetailSection.scss";

export type ProductDetailSectionProps = ComponentPropsWithoutRef<"section"> & {
  data: ProductDetailData;
};

export const ProductDetailSection = ({
  data,
  className,
  ...rest
}: ProductDetailSectionProps) => {
  const {
    id,
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
        id={id}
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
