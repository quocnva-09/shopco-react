import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { PriceText } from "../../atoms/PriceText/PriceText"; // Import Atom con đã có format xịn
import { DEFAULT_CURRENCY } from "@/consts/config";
import "./PriceGroup.scss";

export interface PriceGroupProps extends ComponentPropsWithoutRef<"div"> {
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  currency?: string;
  isDetail?: boolean;
}

export const PriceGroup = ({
  currentPrice,
  originalPrice,
  discountPercentage,
  currency = DEFAULT_CURRENCY,
  isDetail = false,
  className,
  ...rest
}: PriceGroupProps) => {
  const hasDiscount = originalPrice && originalPrice > currentPrice;
  const hasDiscountPercent = discountPercentage && discountPercentage > 0;

  return (
    <div
      className={clsx(
        "product-card__price",
        isDetail && "product-card__price--detail",
        className
      )}
      {...rest}
    >
      <PriceText
        value={currentPrice}
        currency={currency}
        variant="current"
        className="product-card__price--current"
      />

      {hasDiscount && (
        <PriceText
          value={originalPrice}
          currency={currency}
          variant="old"
          className="product-card__price--old"
        />
      )}

      {hasDiscountPercent && (
        <span className="product-card__price--discount">
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
};