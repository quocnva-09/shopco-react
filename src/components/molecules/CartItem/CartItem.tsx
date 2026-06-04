import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text";
import { PriceText } from "@/components/atoms/PriceText";
import { IconButton } from "@/components/atoms/IconButton";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import type { CartItemData } from "@/consts/cartData";
import "./CartItem.scss";

export type CartItemProps = ComponentPropsWithoutRef<"article"> & {
  item: CartItemData;
};

export const CartItem = ({ item, className, ...rest }: CartItemProps) => {
  const { name, imageSrc, imageAlt, price, quantity, variants } = item;

  return (
    <article className={clsx("cart-item", className)} {...rest}>
      <Image
        src={imageSrc}
        alt={imageAlt}
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
              {name}
            </Heading>

            {variants.map((variant) => (
              <Text as="p" key={variant.label} className="cart-item__variant">
                {variant.label}:{" "}
                <Text as="span" className="cart-item__variant-value">
                  {variant.value}
                </Text>
              </Text>
            ))}
          </div>

          <IconButton
            svgName="icn-delete"
            aria-label="Remove item"
            variant="ghost"
            color="red"
            className="cart-item__delete"
          />
        </div>

        {/* Khối 2: price | quantity */}
        <div className="cart-item__bottom">
          <PriceText value={price} className="cart-item__price" />
          <QuantitySelector
            defaultValue={quantity}
            className="cart-item__quantity"
          />
        </div>
      </div>
    </article>
  );
};
