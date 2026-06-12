import { useState, useMemo, useCallback, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { AppDispatch, RootState } from "@/store/store";
import type { ProductData } from "@/types/product";
import type { AddToCartPayload } from "@/types/payload/cart.payload";
import { addToCart } from "@/slices/cartSlice";
import {
  getUniqueColors,
  getUniqueSizes,
} from "@/utils/mappers/product.mapper";
import { TOAST_MESSAGES, CART_LIMIT_MESSAGES } from "@/consts/messages";
import { MAX_PER_ITEM, MAX_TOTAL_QUANTITY } from "@/consts/config";

export const useProductCart = (product: ProductData) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const uniqueColors = useMemo(
    () => getUniqueColors(product.variants),
    [product.variants],
  );
  const uniqueSizes = useMemo(
    () => getUniqueSizes(product.variants),
    [product.variants],
  );

  const [selectedColorId, setSelectedColorId] = useState<number>(
    uniqueColors[0]?.id,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<number>(
    uniqueSizes[0]?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (v) => v.color.id === selectedColorId && v.size.id === selectedSizeId,
      ),
    [product.variants, selectedColorId, selectedSizeId],
  );

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const remainingGlobalCapacity = MAX_TOTAL_QUANTITY - totalQuantity;

  const currentQuantity = useMemo(() => {
    const existingItem = cartItems.find(
      (item) => item.productVariantId === selectedVariant?.id,
    );
    return existingItem?.quantity || 0;
  }, [cartItems, selectedVariant]);

  const remainingItemCapacity = MAX_PER_ITEM - currentQuantity;
  const maxAllowed = Math.max(
    0,
    Math.min(remainingGlobalCapacity, remainingItemCapacity),
  );

  const handleMaxExceeded = useCallback(() => {
    if (remainingGlobalCapacity < remainingItemCapacity) {
      toast.error(CART_LIMIT_MESSAGES.MAX_TOTAL_QUANTITY(MAX_TOTAL_QUANTITY));
    } else {
      toast.error(CART_LIMIT_MESSAGES.MAX_PER_ITEM(MAX_PER_ITEM, product.name));
    }
  }, [remainingGlobalCapacity, remainingItemCapacity, product.name]);

  const handleAddToCart = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedVariant) return;

      if (maxAllowed <= 0) {
        if (remainingItemCapacity <= 0) {
          toast.error(
            CART_LIMIT_MESSAGES.MAX_PER_ITEM(MAX_PER_ITEM, product.name),
          );
        } else {
          toast.error(
            CART_LIMIT_MESSAGES.MAX_TOTAL_QUANTITY(MAX_TOTAL_QUANTITY),
          );
        }
        return;
      }

      const finalQuantityToAdd = Math.min(quantity, maxAllowed);

      if (finalQuantityToAdd < quantity) {
        toast.success(CART_LIMIT_MESSAGES.PARTIAL_ADD(finalQuantityToAdd));
      }

      const primaryImage =
        product.images.find((img) => img.isPrimary)?.imgPath ??
        product.images[0]?.imgPath ??
        "";

      const payload: AddToCartPayload = {
        productId: product.id,
        productVariantId: selectedVariant.id,
        quantity: finalQuantityToAdd,
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
      toast.success(
        TOAST_MESSAGES.PRODUCT_ADDED_TO_CART({ productName: product.name }),
      );
    },
    [dispatch, product, selectedVariant, quantity, cartItems],
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
    product,
    maxAllowed,
    handleMaxExceeded,
  };
};
