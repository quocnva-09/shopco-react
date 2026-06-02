import type {
  ProductApi,
  ProductColorApi,
  ProductImageApi,
  ProductSizeApi,
} from "@/types/api/product.api";
import type {
  ProductData,
  ProductCardData,
  ProductImage,
  SizeItem,
  ColorItem,
} from "@/types/product";

export const mapSize = (size: ProductSizeApi): SizeItem => {
  return { size: size.size, label: size.label };
};

export const mapColor = (color: ProductColorApi): ColorItem => {
  return { color: color.color, hex: color.hex };
};

export const mapProductImage = (apiImage: ProductImageApi): ProductImage => {
  return {
    id: apiImage.id,
    productId: apiImage.product_id,
    imgPath: apiImage.img_path,
    alt: apiImage.alt,
    isPrimary: apiImage.is_primary,
  };
};

export const mapProductData = (apiProduct: ProductApi): ProductData => {
  const discountPercent =
    apiProduct.price_discount && apiProduct.price > apiProduct.price_discount
      ? Math.round(
          ((apiProduct.price - apiProduct.price_discount) / apiProduct.price) *
            100,
        )
      : 0;

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description,
    currentPrice: apiProduct.price_discount || apiProduct.price,
    originalPrice: apiProduct.price_discount ? apiProduct.price : undefined,
    discountPercent,
    sizes: (apiProduct.sizes || []).map(mapSize),
    colors: (apiProduct.colors || []).map(mapColor),
    isActive: apiProduct.is_active,
    ratingAvg: apiProduct.rating_avg,
    reviewsCount: apiProduct.reviews_count,
    soldCount: apiProduct.sold_count,
    createdAt: apiProduct.created_at,
    updatedAt: apiProduct.updated_at,
    category: {
      id: apiProduct.category?.id,
      name: apiProduct.category?.name,
      slug: apiProduct.category?.slug,
    },
    images: (apiProduct.images || []).map(mapProductImage),
  };
};

export const mapProductCardData = (apiProduct: ProductApi): ProductCardData => {
  const primaryImage =
    apiProduct.images?.find((img) => img.is_primary)?.img_path ||
    apiProduct.images?.[0]?.img_path;

  // Calculate discount percentage if needed
  let discountPercentage = undefined;
  if (
    apiProduct.price_discount &&
    apiProduct.price > apiProduct.price_discount
  ) {
    discountPercentage = Math.round(
      ((apiProduct.price - apiProduct.price_discount) / apiProduct.price) * 100,
    );
  }

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    primaryImage,
    currentPrice: apiProduct.price_discount || apiProduct.price,
    originalPrice: apiProduct.price_discount ? apiProduct.price : undefined,
    discountPercentage,
    rating: apiProduct.rating_avg || 0,
  };
};
