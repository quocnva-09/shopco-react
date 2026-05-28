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

  const fallbackImage = "assets/images/default.png";

  return (
    <div
      className={clsx(
        "product-card",
        isDetail && "product-card--detail",
        className
      )}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      {...rest}
    >
      {/* 1. KHỐI ẢNH: Sử dụng Atom Image có fallback chống lỗi ảnh */}
      <figure className="product-card__image">
        <Image
          src={primaryImage || fallbackImage}
          fallbackSrc={fallbackImage}
          alt={name}
          title={name}
          renderWrapper={false} // Không render thẻ div bọc ngoài của Atom Image để giữ đúng cấu trúc CSS cũ
        />
      </figure>

      {/* 2. KHỐI TÊN: Sử dụng Atom Heading thông minh tự động cắt chữ và tích hợp sẵn Tooltip */}
      <Heading
        as={isDetail ? "h1" : "h3"} // Tự động đổi thẻ SEO: h1 cho trang chi tiết, h3 cho danh sách ngoài grid
        lineClamp={isDetail ? 0 : 1} // Trang detail cho xuống dòng thoải mái, ngoài card cắt cứng 1 dòng
        showTooltip={!isDetail} // Chỉ bật Custom Tooltip khi ở ngoài danh sách bị cắt chữ
        className="product-card__name"
        tooltipClassName="tooltip--product-card"
      >
        {name}
      </Heading>

      {/* 3. KHỐI ĐÁNH GIÁ: Sử dụng Atom Rating đã tích hợp thuật toán ẩn sao trống */}
      <Rating 
        value={rating} 
        className="product-card__rating" 
      />

      {/* 4. KHỐI GIÁ TIỀN: Sử dụng Molecule PriceGroup bọc hàm Intl định dạng tiền tệ */}
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