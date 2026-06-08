import { type ComponentPropsWithoutRef } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text";
import { PriceText } from "@/components/atoms/PriceText";
import { IconButton } from "@/components/atoms/IconButton";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import type { CartItem as CartItemType } from "@/types/cart";
import type { AppDispatch } from "@/store/store";
import { removeCartItem, updateQuantity } from "@/slices/cartSlice";
import "./CartItem.scss";

export type CartItemProps = ComponentPropsWithoutRef<"article"> & {
  item: CartItemType;
};

export const CartItem = ({ item, className, ...rest }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product, variant, quantity, productVariantId } = item;

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({ productVariantId, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(productVariantId));
  };

  return (
    <article className={clsx("cart-item", className)} {...rest}>
      <Image
        src={product.imgPath}
        alt={product.name}
        className="cart-item__image-wrap"
        imgClassName="cart-item__image"
      />

      <div className="cart-item__info">
        {/* Khối 1: name + variants | delete */}
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
            onClick={handleRemove}
          />
        </div>

        {/* Khối 2: price | quantity */}
        <div className="cart-item__bottom">
          <PriceText
            value={product.priceDiscount}
            className="cart-item__price"
          />
          <QuantitySelector
            defaultValue={quantity}
            className="cart-item__quantity"
            onChange={handleQuantityChange}
          />
        </div>
      </div>
    </article>
  );
};
