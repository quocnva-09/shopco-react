import type {
  ProductApi,
  ProductImageApi,
  ProductVariantApi,
} from "@/types/api/product.api";
import type {
  ProductData,
  ProductCardData,
  ProductImage,
  ProductVariant,
  ColorItem,
  SizeItem,
} from "@/types/product";

export const mapVariant = (v: ProductVariantApi): ProductVariant => ({
  id: v.id,
  color: {
    id: v.color.id,
    name: v.color.name,
    hexCode: v.color.hex_code,
  },
  size: {
    id: v.size.id,
    name: v.size.name,
    label: v.size.label,
  },
});

export const getUniqueColors = (variants: ProductVariant[]): ColorItem[] => {
  const seen = new Set<string>();
  return variants.reduce<ColorItem[]>((acc, v) => {
    if (!seen.has(v.color.name)) {
      seen.add(v.color.name);
      acc.push(v.color);
    }
    return acc;
  }, []);
}; 

export const getUniqueSizes = (variants: ProductVariant[]): SizeItem[] => {
  const seen = new Set<string>();
  return variants.reduce<SizeItem[]>((acc, v) => {
    if (!seen.has(v.size.name)) {
      seen.add(v.size.name);
      acc.push(v.size);
    }
    return acc;
  }, []);
};

export const mapProductImage = (apiImage: ProductImageApi): ProductImage => ({
  id: apiImage.id,
  productId: apiImage.product_id,
  imgPath: apiImage.img_path,
  alt: apiImage.alt,
  isPrimary: Boolean(apiImage.is_primary),
});

export const mapProductData = (apiProduct: ProductApi): ProductData => {
  const price = parseFloat(apiProduct.price);
  const hasDiscount = apiProduct.price_discount !== null && apiProduct.price_discount > 0;

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    description: apiProduct.description,
    currentPrice: apiProduct.final_price,
    originalPrice: hasDiscount ? price : undefined,
    discountPercent: apiProduct.price_discount ?? 0,
    variants: (apiProduct.variants ?? []).map(mapVariant),
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
    images: (apiProduct.images ?? []).map(mapProductImage),
  };
};

export const mapProductCardData = (apiProduct: ProductApi): ProductCardData => {
  const price = parseFloat(apiProduct.price);
  const hasDiscount = apiProduct.price_discount !== null && apiProduct.price_discount > 0;

  const primaryImage =
    apiProduct.images?.find((img) => img.is_primary)?.img_path ??
    apiProduct.images?.[0]?.img_path;

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    primaryImage,
    currentPrice: apiProduct.final_price,
    originalPrice: hasDiscount ? price : undefined,
    discountPercentage: apiProduct.price_discount ?? undefined,
    rating: apiProduct.rating_avg ?? 0,
  };
};
