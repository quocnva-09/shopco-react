import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import { PriceText } from "@/components/atoms/PriceText";
import { IconButton } from "@/components/atoms/IconButton";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import type { CartItem as CartItemType } from "@/types/cart";
import "./index.scss";

export type CartItemProps = ComponentPropsWithoutRef<"article"> & {
  item: CartItemType;
  /**
   * When true, replaces the editable QuantitySelector with a static "Qty: X"
   * label and hides the delete button. Use this in checkout review mode.
   */
  isReadOnly?: boolean;
  /** Upper bound for the quantity selector. Computed & supplied by the parent. */
  maxAllowed?: number;
  /** Called when the user changes quantity (including decrement to 0 which triggers removal). */
  onQuantityChange?: (newQuantity: number) => void;
  /** Called when the user exceeds maxAllowed. Parent decides which toast to show. */
  onMaxExceeded?: () => void;
  /** Called when the user clicks the delete (trash) icon button. */
  onRemoveClick?: () => void;
};

export const CartItem = ({
  item,
  isReadOnly = false,
  maxAllowed,
  onQuantityChange,
  onMaxExceeded,
  onRemoveClick,
  className,
  ...rest
}: CartItemProps) => {
  const { product, variant, quantity } = item;

  return (
    <article
      className={clsx("cart-item", className)}
      aria-label={`Cart item: ${product.name}`}
      {...rest}
    >
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

          {!isReadOnly && (
            <IconButton
              svgName="icn-delete"
              aria-label="Remove item"
              variant="ghost"
              color="red"
              className="cart-item__delete"
              onClick={onRemoveClick}
            />
          )}
        </div>

        {/* Block 2: price | quantity */}
        <div className="cart-item__bottom">
          <PriceText value={product.priceDiscount} className="cart-item__price" />
          {isReadOnly ? (
            <Text as="span" className="cart-item__quantity-text">
              Qty: {quantity}
            </Text>
          ) : (
            <QuantitySelector
              value={quantity}
              min={0}
              max={maxAllowed}
              onMaxExceeded={onMaxExceeded}
              className="cart-item__quantity"
              onChange={onQuantityChange}
            />
          )}
        </div>
      </div>
    </article>
  );
};
