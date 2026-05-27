import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import "./ProductGallery.scss";

export interface ProductImage {
  img_path: string;
}

export interface ProductGalleryProps extends ComponentPropsWithoutRef<"figure"> {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery = ({
  images,
  productName,
  className,
  ...rest
}: ProductGalleryProps) => {
  const mainImage = images[0]?.img_path || "";

  return (
    <figure className={clsx("product-detail__gallery", className)} {...rest}>
      <div className="product-detail__thumbnails">
        {images.map((img, idx) => (
          <Image
            key={img.img_path}
            src={img.img_path}
            alt={`${productName} - Thumbnail ${idx + 1}`}
            title={`${productName} - Thumbnail ${idx + 1}`}
            renderWrapper={false}
            className={clsx(
              "product-detail__thumbnail",
              idx === 0 && "product-detail__thumbnail--active"
            )}
          />
        ))}
      </div>
      <div className="product-detail__main-image">
        <Image
          src={mainImage}
          alt={productName}
          title={productName}
          renderWrapper={false}
        />
      </div>
    </figure>
  );
};
