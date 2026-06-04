import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Rating } from "@/components/atoms/Rating/Rating";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PriceGroup } from "@/components/molecules/PriceGroup/PriceGroup";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import type { ProductData } from "@/types/product";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import "./ProductDetailInfo.scss";

export type ProductDetailInfoProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "id"
> & {
  product: ProductData;
};

export const ProductDetailInfo = ({
  product,
  className,
  ...rest
}: ProductDetailInfoProps) => {
  const rating = product.ratingAvg ?? 0;

  return (
    <div className={clsx("product-detail__info", className)} {...rest}>
      {/* Product Card Info: Name + Rating + Price */}
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="product-detail__name"
        fontFamily="'IntegralCF', sans-serif"
      >
        {product.name}
      </Heading>

      <Rating value={rating} className="product-detail__rating" />

      <PriceGroup
        currentPrice={product.currentPrice}
        originalPrice={product.originalPrice}
        discountPercentage={product.discountPercent}
        isDetail={true}
      />

      {/* Description */}
      <Text as="p" className="product-detail__description">
        {product.description}
      </Text>

      {/* Form: Color + Size + Quantity + Add to Cart */}
      <form className="product-detail__form">
        {/* Color Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Select Colors
          </Text>
          <ColorSelector
            name="color"
            colors={product.colors}
            key={product.id}
          />
        </div>

        {/* Size Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Choose Size
          </Text>
          <SizeSelector name="size" sizes={product.sizes} key={product.id} />
        </div>

        {/* Actions */}
        <div className="product-detail__actions">
          <QuantitySelector className="product-detail__quantity" />
          <Button
            variant="solid"
            fullWidth
            type="submit"
            className="product-detail__btn"
          >
            Add to Cart
          </Button>
        </div>
      </form>
    </div>
  );
};
