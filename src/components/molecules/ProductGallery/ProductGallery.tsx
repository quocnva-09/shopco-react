import { useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import "./ProductGallery.scss";

export interface ProductImage {
  img_path: string;
}

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
  const initialImage = images[0]?.img_path || "";
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <figure className={clsx("product-detail__gallery", className)} {...rest}>
      <div className="product-detail__thumbnails">
        {images.map((img, idx) => (
          <Image
            key={`${productName} - Thumbnail ${idx + 1}`}
            src={img.img_path}
            alt={`${productName} - Thumbnail ${idx + 1}`}
            title={`${productName} - Thumbnail ${idx + 1}`}
            renderWrapper={false}
            className={clsx(
              "product-detail__thumbnail",
              img.img_path === selectedImage &&
                "product-detail__thumbnail--active",
            )}
            onClick={() => handleImageClick(img.img_path)}
          />
        ))}
      </div>
      <div className="product-detail__main-image">
        <Image
          src={selectedImage}
          alt={productName}
          title={productName}
          renderWrapper={false}
        />
      </div>
    </figure>
  );
};
