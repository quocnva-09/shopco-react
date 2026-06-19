import { useState, type ComponentPropsWithoutRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import toast from "react-hot-toast";
import { CartItem as CartItemComponent } from "@/components/molecules/CartItem";
import { CartSummary, type SummaryLineItem } from "@/components/organisms/CartSummary";
import { ConfirmModal } from "@/components/organisms/ConfirmModal";
import { Text } from "@/components/atoms/Text";
import type { CartItem } from "@/types/cart";
import type { AppDispatch, RootState } from "@/store/store";
import { removeCartItem, updateQuantity } from "@/slices/cartSlice";
import { TOAST_MESSAGES, CART_LIMIT_MESSAGES } from "@/consts/messages";
import { MAX_PER_ITEM, MAX_TOTAL_QUANTITY } from "@/consts/config";
import "./index.scss";

export type CartSectionProps = ComponentPropsWithoutRef<"div"> & {
  items: CartItem[];
  /** Pre-computed line items for the order summary sidebar. Computed at the Page level. */
  lineItems: SummaryLineItem[];
  /** Pre-computed total. Computed at the Page level. */
  total: number;
};

export const CartSection = ({
  items,
  lineItems,
  total,
  className,
  ...rest
}: CartSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Tracks which item's confirm-delete modal is open (null = none open)
  const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const getMaxAllowed = (item: CartItem) => {
    const remainingGlobal = MAX_TOTAL_QUANTITY - totalQuantity + item.quantity;
    return Math.min(MAX_PER_ITEM, remainingGlobal);
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) {
      // Decrement to zero → open the confirm-remove dialog
      setPendingRemoveId(item.productVariantId);
    } else {
      dispatch(updateQuantity({ productVariantId: item.productVariantId, quantity: newQuantity }));
    }
  };

  const handleRemoveClick = (item: CartItem) => {
    setPendingRemoveId(item.productVariantId);
  };

  const handleMaxExceeded = (item: CartItem) => {
    const remainingGlobal = MAX_TOTAL_QUANTITY - totalQuantity + item.quantity;
    if (remainingGlobal < MAX_PER_ITEM) {
      toast.error(CART_LIMIT_MESSAGES.MAX_TOTAL_QUANTITY(MAX_TOTAL_QUANTITY));
    } else {
      toast.error(CART_LIMIT_MESSAGES.MAX_PER_ITEM(MAX_PER_ITEM, item.product.name));
    }
  };

  const confirmRemove = () => {
    if (pendingRemoveId === null) return;
    const item = items.find((i) => i.productVariantId === pendingRemoveId);
    dispatch(removeCartItem(pendingRemoveId));
    if (item) {
      toast.success(TOAST_MESSAGES.PRODUCT_REMOVED_FROM_CART({ productName: item.product.name }));
    }
    setPendingRemoveId(null);
  };

  const pendingItem = items.find((i) => i.productVariantId === pendingRemoveId);

  if (items.length === 0) {
    return (
      <Text as="p" className="cart__empty">
        Your cart is empty
      </Text>
    );
  }

  return (
    <>
      <div className={clsx("cart", className)} {...rest}>
        <section className="cart__items" aria-label="Cart Items">
          {items.map((item) => (
            <CartItemComponent
              key={item.productVariantId}
              item={item}
              maxAllowed={getMaxAllowed(item)}
              onQuantityChange={(qty) => handleQuantityChange(item, qty)}
              onMaxExceeded={() => handleMaxExceeded(item)}
              onRemoveClick={() => handleRemoveClick(item)}
            />
          ))}
        </section>
        <CartSummary lineItems={lineItems} total={total} />
      </div>

      {/* Single shared ConfirmModal — only one item can be pending removal at a time */}
      <ConfirmModal
        isOpen={pendingRemoveId !== null}
        onClose={() => setPendingRemoveId(null)}
        onConfirm={confirmRemove}
        title="Remove Item"
        message={
          pendingItem
            ? `Are you sure you want to remove "${pendingItem.product.name}" from your cart?`
            : "Are you sure you want to remove this item?"
        }
        confirmText="Remove"
        isDestructive
      />
    </>
  );
};

