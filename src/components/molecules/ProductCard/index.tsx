import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Rating } from "@/components/atoms/Rating";
import { PriceGroup } from "@/components/molecules/PriceGroup";
import { PATHS } from "@/routes/paths";
import "./index.scss";

import type { ProductCardData } from "@/types/product";

export type ProductCardProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "to"
> & {
  product: ProductCardData;
  isDetail?: boolean;
  to?: string;
};

export const ProductCard = ({
  product,
  isDetail = false,
  className,
  onClick,
  ...rest
}: ProductCardProps) => {
  const {
    id,
    name,
    primaryImage,
    currentPrice,
    originalPrice,
    discountPercentage,
    rating,
  } = product;
  return (
    <Link
      {...rest}
      to={`${PATHS.PRODUCT}/${id}`}
      className={clsx(
        "product-card",
        isDetail && "product-card--detail",
        className,
      )}
      onClick={onClick}
      style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
    >
      <figure className="product-card__image">
        <Image
          src={primaryImage}
          alt={name}
          title={name}
          renderWrapper={false}
        />
      </figure>

      <Heading
        as={isDetail ? "h1" : "h3"}
        lineClamp={isDetail ? 0 : 1}
        showTooltip={!isDetail}
        mobileLineClamp={isDetail ? undefined : 2}
        mobileShowTooltip={isDetail ? undefined : false}
        className="product-card__name"
        tooltipClassName="tooltip--product-card"
      >
        {name}
      </Heading>

      <Rating value={rating} className="product-card__rating" />

      <PriceGroup
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
        isDetail={isDetail}
        className="product-card__price"
      />
    </Link>
  );
};
