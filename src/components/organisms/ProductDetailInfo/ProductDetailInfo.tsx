import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Rating } from "@/components/atoms/Rating/Rating";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PriceGroup } from "@/components/molecules/PriceGroup/PriceGroup";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import type { ColorItem } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import "./ProductDetailInfo.scss";

export type ProductDetailInfoProps = ComponentPropsWithoutRef<"div"> & {
  name: string;
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  description: string;
  colors: ColorItem[];
  sizes: string[];
};

export const ProductDetailInfo = ({
  name,
  rating,
  currentPrice,
  originalPrice,
  discountPercentage,
  description,
  colors,
  sizes,
  className,
  ...rest
}: ProductDetailInfoProps) => {
  return (
    <div className={clsx("product-detail__info", className)} {...rest}>
      {/* Product Card Info: Name + Rating + Price */}
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="product-detail__name"
        fontSize="40px"
        fontFamily="'IntegralCF', sans-serif"
      >
        {name}
      </Heading>

      <Rating value={rating} /*className="product-card__rating"*/ />

      <PriceGroup
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
        isDetail
        //className="product-card__price"
      />

      {/* Description */}
      <Text as="p" className="product-detail__description">
        {description}
      </Text>

      {/* Form: Color + Size + Quantity + Add to Cart */}
      <form className="product-detail__form">
        {/* Color Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Select Colors
          </Text>
          <ColorSelector name="color" colors={colors} />
        </div>

        {/* Size Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Choose Size
          </Text>
          <SizeSelector name="size" sizes={sizes} />
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
