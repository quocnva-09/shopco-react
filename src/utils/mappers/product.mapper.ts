import type { ProductApi, ProductImageApi } from "@/types/api/product.api";
import type {
  ProductData,
  ProductCardData,
  ProductDetailData,
  ProductImage,
  SizeItem,
  ColorItem,
} from "@/types/product";
import { SIZE_LIST } from "@/consts/sizes";
import { COLOR_LIST } from "@/consts/colors";

export const mapSize = (sizeStr: string): SizeItem => {
  const found = SIZE_LIST.find(
    (s) => s.size.toLowerCase() === sizeStr.toLowerCase(),
  );
  return found || { size: sizeStr, label: sizeStr };
};

export const mapColor = (colorStr: string): ColorItem => {
  const found = COLOR_LIST.find(
    (c) => c.color.toLowerCase() === colorStr.toLowerCase(),
  );
  return found || { color: colorStr, hex: "#cccccc" };
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
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description,
    price: apiProduct.price,
    priceDiscount: apiProduct.price_discount,
    sizes: apiProduct.sizes || [],
    colors: apiProduct.colors || [],
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

export const mapProductDetailData = (
  apiProduct: ProductApi,
): ProductDetailData => {
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
    rating: apiProduct.rating_avg || 0,
    currentPrice: apiProduct.price_discount || apiProduct.price,
    originalPrice: apiProduct.price_discount ? apiProduct.price : undefined,
    discountPercentage,
    description: apiProduct.description,
    images: (apiProduct.images || []).map(mapProductImage),
    colors: (apiProduct.colors || []).map(mapColor),
    sizes: (apiProduct.sizes || []).map(mapSize),
  };
};
