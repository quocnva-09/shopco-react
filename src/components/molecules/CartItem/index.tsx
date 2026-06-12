import { useState, type ComponentPropsWithoutRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { PriceText } from "@/components/atoms/PriceText";
import { IconButton } from "@/components/atoms/IconButton";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import { ConfirmModal } from "@/components/organisms/ConfirmModal";
import type { CartItem as CartItemType } from "@/types/cart";
import type { AppDispatch, RootState } from "@/store/store";
import { removeCartItem, updateQuantity } from "@/slices/cartSlice";
import { TOAST_MESSAGES, CART_LIMIT_MESSAGES } from "@/consts/messages";
import { MAX_PER_ITEM, MAX_TOTAL_QUANTITY } from "@/consts/config";
import "./index.scss";
export type CartItemProps = ComponentPropsWithoutRef<"article"> & {
  item: CartItemType;
  isCheckout?: boolean;
};

export const CartItem = ({ item, isCheckout, className, ...rest }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { product, variant, quantity, productVariantId } = item;

  const totalQuantity = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const remainingGlobal = MAX_TOTAL_QUANTITY - totalQuantity + quantity;
  const maxAllowed = Math.min(MAX_PER_ITEM, remainingGlobal);

  const handleMaxExceeded = () => {
    if (remainingGlobal < MAX_PER_ITEM) {
      toast.error(CART_LIMIT_MESSAGES.MAX_TOTAL_QUANTITY(MAX_TOTAL_QUANTITY));
    } else {
      toast.error(CART_LIMIT_MESSAGES.MAX_PER_ITEM(MAX_PER_ITEM, product.name));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setIsConfirmModalOpen(true);
    } else {
      dispatch(updateQuantity({ productVariantId, quantity: newQuantity }));
    }
  };

  const handleRemoveClick = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmRemove = () => {
    dispatch(removeCartItem(productVariantId));
    toast.success(TOAST_MESSAGES.PRODUCT_REMOVED_FROM_CART({ productName: product.name }));
  };

  return (
    <>
      <article className={clsx("cart-item", className)} {...rest}>
      <Image
        src={product.imgPath}
        alt={product.name}
        className="cart-item__image-wrap"
        imgClassName="cart-item__image"
      />

      <div className="cart-item__info">
        {/* Block 1: name + variants | delete */}
        <div className="cart-item__top">
          <div className="cart-item__meta">
            <Heading
              as="h2"
              lineClamp={1}
              showTooltip={false}
              className="cart-item__name"
            >
              {product.name}
            </Heading>

            <Text as="p" className="cart-item__variant">
              Color:{" "}
              <Text as="span" className="cart-item__variant-value">
                {variant.color}
              </Text>
            </Text>

            <Text as="p" className="cart-item__variant">
              Size:{" "}
              <Text as="span" className="cart-item__variant-value">
                {variant.sizeLabel}
              </Text>
            </Text>
          </div>

          <IconButton
            svgName="icn-delete"
            aria-label="Remove item"
            variant="ghost"
            color="red"
            className="cart-item__delete"
            onClick={handleRemoveClick}
          />
        </div>

        {/* Block 2: price | quantity */}
        <div className="cart-item__bottom">
          <PriceText
            value={product.priceDiscount}
            className="cart-item__price"
          />
          {isCheckout ? (
            <Text as="span" className="cart-item__quantity-text">
              Qty: {quantity}
            </Text>
          ) : (
            <QuantitySelector
              value={quantity}
              min={0}
              max={maxAllowed}
              onMaxExceeded={handleMaxExceeded}
              className="cart-item__quantity"
              onChange={handleQuantityChange}
            />
          )}
        </div>
      </div>
    </article>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmRemove}
        title="Remove Item"
        message={`Are you sure you want to remove "${product.name}" from your cart?`}
        confirmText="Remove"
        isDestructive
      />
    </>
  );
};
