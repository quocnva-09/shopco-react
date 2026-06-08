import {
  useState,
  useMemo,
  useCallback,
  type SyntheticEvent,
  type ComponentPropsWithoutRef,
} from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Rating } from "@/components/atoms/Rating/Rating";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PriceGroup } from "@/components/molecules/PriceGroup/PriceGroup";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import type { ProductData } from "@/types/product";
import type { AppDispatch } from "@/store/store";
import type { AddToCartPayload } from "@/types/payload/cart.payload";
import { addToCart } from "@/slices/cartSlice";
import {
  getUniqueColors,
  getUniqueSizes,
} from "@/utils/mappers/product.mapper";
import "./ProductDetailInfo.scss";

export type ProductDetailInfoProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "id"
> & {
  product: ProductData;
};

export const ProductDetailInfo = ({
  product,
  className,
  ...rest
}: ProductDetailInfoProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const rating = product.ratingAvg ?? 0;

  const uniqueColors = useMemo(
    () => getUniqueColors(product.variants),
    [product.variants],
  );

  const uniqueSizes = useMemo(
    () => getUniqueSizes(product.variants),
    [product.variants],
  );

  // Variant selection state
  const [selectedColorId, setSelectedColorId] = useState<number>(
    uniqueColors[0]?.id,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<number>(
    uniqueSizes[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  // Resolve selected variant from current color + size selection
  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (v) => v.color.id === selectedColorId && v.size.id === selectedSizeId,
      ),
    [product.variants, selectedColorId, selectedSizeId],
  );

  // Add to cart handler
  const handleAddToCart = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!selectedVariant) return;

      // Resolve primary image — fallback to first image
      const primaryImage =
        product.images.find((img) => img.isPrimary)?.imgPath ??
        product.images[0]?.imgPath ??
        "";

      const payload: AddToCartPayload = {
        productId: product.id,
        productVariantId: selectedVariant.id,
        quantity,
        variant: {
          id: selectedVariant.id,
          colorId: selectedVariant.color.id,
          color: selectedVariant.color.name,
          colorHex: selectedVariant.color.hexCode,
          sizeId: selectedVariant.size.id,
          size: selectedVariant.size.name,
          sizeLabel: selectedVariant.size.label,
        },
        product: {
          id: product.id,
          name: product.name,
          imgPath: primaryImage,
          price: product.originalPrice ?? product.currentPrice,
          priceDiscount: product.currentPrice,
        },
      };

      dispatch(addToCart(payload));
    },
    [dispatch, product, selectedVariant, quantity],
  );

  return (
    <div className={clsx("product-detail__info", className)} {...rest}>
      {/* Product Card Info: Name + Rating + Price */}
      <Heading
        as="h2"
        lineClamp={0}
        showTooltip={false}
        className="product-detail__name"
        fontFamily="'IntegralCF', sans-serif"
      >
        {product.name}
      </Heading>

      <Rating value={rating} className="product-detail__rating" />

      <PriceGroup
        currentPrice={product.currentPrice}
        originalPrice={product.originalPrice}
        discountPercentage={product.discountPercent}
        isDetail={true}
      />

      {/* Description */}
      <Text as="p" className="product-detail__description">
        {product.description}
      </Text>

      {/* Form: Color + Size + Quantity + Add to Cart */}
      <form className="product-detail__form" onSubmit={handleAddToCart}>
        {/* Color Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Select Colors
          </Text>
          <ColorSelector
            name="color"
            colors={uniqueColors}
            key={product.id}
            onChange={setSelectedColorId}
          />
        </div>

        {/* Size Variant */}
        <div className="product-detail__variant">
          <Text as="span" className="product-detail__variant-label">
            Choose Size
          </Text>
          <SizeSelector
            name="size"
            sizes={uniqueSizes}
            key={product.id}
            onChange={setSelectedSizeId}
          />
        </div>

        {/* Actions */}
        <div className="product-detail__actions">
          <QuantitySelector
            className="product-detail__quantity"
            onChange={setQuantity}
          />
          <Button
            variant="solid"
            fullWidth
            type="submit"
            className="product-detail__btn"
            disabled={!selectedVariant}
          >
            Add to Cart
          </Button>
        </div>
      </form>
    </div>
  );
};
