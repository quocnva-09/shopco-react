import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import "./index.scss";

import type { ProductImage } from "@/types/product";

export type ProductGalleryProps = ComponentPropsWithoutRef<"figure"> & {
  images: ProductImage[];
  productName: string;
};

export const ProductGallery = ({
  images,
  productName,
  className,
  ...rest
}: ProductGalleryProps) => {
  const initialImage = images[0]?.imgPath || "";
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className={clsx("product-detail__gallery", className)} {...rest}>
      <div className="product-detail__thumbnails">
        {images.map((img, idx) => (
          <button
            key={`${productName} - Thumbnail ${idx + 1}`}
            type="button"
            aria-label={`View image ${idx + 1}`}
            className={clsx(
              "product-detail__thumbnail-btn",
              img.imgPath === selectedImage &&
                "product-detail__thumbnail-btn--active",
            )}
            onClick={() => handleImageClick(img.imgPath)}
          >
            <Image
              src={img.imgPath}
              alt={`${productName} - Thumbnail ${idx + 1}`}
              title={`${productName} - Thumbnail ${idx + 1}`}
              renderWrapper={false}
              className="product-detail__thumbnail"
            />
          </button>
        ))}
      </div>
      <figure className="product-detail__main-image">
        <Image
          src={selectedImage}
          alt={productName}
          title={productName}
          renderWrapper={false}
        />
      </figure>
    </div>
  );
};
