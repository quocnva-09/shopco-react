import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { PriceText } from "../../atoms/PriceText"; // PriceText atom with built-in currency formatting
import { DEFAULT_CURRENCY } from "@/consts/config";
import "./index.scss";

export type PriceGroupProps = ComponentPropsWithoutRef<"div"> & {
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  currency?: string;
  isDetail?: boolean;
};

export const PriceGroup = ({
  currentPrice,
  originalPrice,
  discountPercentage,
  currency = DEFAULT_CURRENCY,
  isDetail = false,
  className,
  ...rest
}: PriceGroupProps) => {
  const hasDiscount = (originalPrice ?? 0) > currentPrice;
  const hasDiscountPercent = (discountPercentage ?? 0) > 0;

  return (
    <div
      className={clsx("price", isDetail && "price--detail", className)}
      {...rest}
    >
      <PriceText
        value={currentPrice}
        currency={currency}
        variant="current"
        className="price--current"
      />

      {hasDiscount && (
        <PriceText
          value={originalPrice!}
          currency={currency}
          variant="old"
          className="price--old"
        />
      )}

      {hasDiscountPercent && (
        <span className="price--discount">-{discountPercentage}%</span>
      )}
    </div>
  );
};
