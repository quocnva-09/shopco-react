import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Rating } from "@/components/atoms/Rating/Rating";
import { PriceGroup } from "@/components/molecules/PriceGroup/PriceGroup";
import "./ProductCard.scss";

// Khai báo kiểu dữ liệu đầu vào sạch cho Product Proptypes
export interface ProductCardData {
  id: string | number;
  name: string;
  primaryImage?: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number; // Điểm trung bình số sao đã được tính toán sẵn từ API tầng trên
}

export type ProductCardProps = ComponentPropsWithoutRef<"div"> & {
  product: ProductCardData;
  isDetail?: boolean; // Cờ chuyển đổi giao diện sang dạng trang Product Detail lớn
};

export const ProductCard = ({
  product,
  isDetail = false,
  className,
  onClick,
  ...rest
}: ProductCardProps) => {
  const {
    name,
    primaryImage,
    currentPrice,
    originalPrice,
    discountPercentage,
    rating,
  } = product;

  const fallbackImage = "default.png";

  return (
    <div
      className={clsx(
        "product-card",
        isDetail && "product-card--detail",
        className,
      )}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      {...rest}
    >
      <figure className="product-card__image">
        <Image
          src={primaryImage || fallbackImage}
          fallbackSrc={fallbackImage}
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
    </div>
  );
};
