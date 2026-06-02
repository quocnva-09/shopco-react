import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { ProductGallery } from "@/components/molecules/ProductGallery";
import { ProductDetailInfo } from "@/components/organisms/ProductDetailInfo";
import type { ProductData } from "@/types/product";
import "./ProductDetailSection.scss";

export type ProductDetailSectionProps = ComponentPropsWithoutRef<"section"> & {
  data: ProductData;
};

export const ProductDetailSection = ({
  data,
  className,
  ...rest
}: ProductDetailSectionProps) => {
  const { name, images } = data;

  return (
    <section className={clsx("product-detail", className)} {...rest}>
      <ProductGallery images={images} productName={name} />
      <ProductDetailInfo product={data} />
    </section>
  );
};
