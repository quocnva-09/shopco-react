import { useState, useMemo, useCallback, type SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch } from "@/store/store";
import type { ProductData } from "@/types/product";
import type { AddToCartPayload } from "@/types/payload/cart.payload";
import { addToCart } from "@/slices/cartSlice";
import { getUniqueColors, getUniqueSizes } from "@/utils/mappers/product.mapper";
import { TOAST_MESSAGES } from "@/consts/messages";

export const useProductCart = (product: ProductData) => {
  const dispatch = useDispatch<AppDispatch>();

  const uniqueColors = useMemo(() => getUniqueColors(product.variants), [product.variants]);
  const uniqueSizes = useMemo(() => getUniqueSizes(product.variants), [product.variants]);

  const [selectedColorId, setSelectedColorId] = useState<number>(uniqueColors[0]?.id);
  const [selectedSizeId, setSelectedSizeId] = useState<number>(uniqueSizes[0]?.id);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.color.id === selectedColorId && v.size.id === selectedSizeId),
    [product.variants, selectedColorId, selectedSizeId],
  );

  const handleAddToCart = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedVariant) return;

      const primaryImage = product.images.find((img) => img.isPrimary)?.imgPath ?? product.images[0]?.imgPath ?? "";

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
      toast.success(TOAST_MESSAGES.PRODUCT_ADDED_TO_CART({ productName: product.name }));
    },
    [dispatch, product, selectedVariant, quantity],
  );

  return {
    uniqueColors,
    uniqueSizes,
    selectedColorId,
    setSelectedColorId,
    selectedSizeId,
    setSelectedSizeId,
    quantity,
    setQuantity,
    selectedVariant,
    handleAddToCart,
  };
};
