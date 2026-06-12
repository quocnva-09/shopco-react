import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Rating } from "@/components/atoms/Rating";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { PriceGroup } from "@/components/molecules/PriceGroup";
import { ColorSelector } from "@/components/molecules/ColorSelector";
import { SizeSelector } from "@/components/molecules/SizeSelector";
import { QuantitySelector } from "@/components/molecules/QuantitySelector";
import type { ProductData } from "@/types/product";
import {
  ProductCartProvider,
  useProductCartContext,
} from "./ProductCartContext";
import "./index.scss";

type RootProps = ComponentPropsWithoutRef<"div"> & {
  product: ProductData;
  children: ReactNode;
};

const Root = ({ product, children, className, ...rest }: RootProps) => {
  return (
    <ProductCartProvider product={product}>
      <div className={clsx("product-detail__info", className)} {...rest}>
        {children}
      </div>
    </ProductCartProvider>
  );
};

const Header = ({ name, ratingAvg }: { name: string; ratingAvg?: number }) => (
  <>
    <Heading
      as="h2"
      lineClamp={0}
      showTooltip={false}
      className="product-detail__name"
    >
      {name}
    </Heading>
    <Rating value={ratingAvg ?? 0} className="product-detail__rating" />
  </>
);

const Price = ({
  currentPrice,
  originalPrice,
  discountPercent,
}: {
  currentPrice: number;
  originalPrice?: number | null;
  discountPercent?: number | null;
}) => (
  <PriceGroup
    currentPrice={currentPrice}
    originalPrice={originalPrice}
    discountPercentage={discountPercent}
    isDetail={true}
  />
);

const Description = ({ children }: { children: ReactNode }) => (
  <Text as="p" className="product-detail__description">
    {children}
  </Text>
);

const Form = ({ children }: { children: ReactNode }) => {
  const { handleAddToCart } = useProductCartContext();
  return (
    <form className="product-detail__form" onSubmit={handleAddToCart}>
      {children}
    </form>
  );
};

const ColorSelection = () => {
  const { uniqueColors, setSelectedColorId } = useProductCartContext();
  return (
    <div className="product-detail__variant">
      <Text as="span" className="product-detail__variant-label">
        Select Colors
      </Text>
      <ColorSelector
        name="color"
        colors={uniqueColors}
        onChange={setSelectedColorId}
      />
    </div>
  );
};

const SizeSelection = () => {
  const { uniqueSizes, setSelectedSizeId } = useProductCartContext();
  return (
    <div className="product-detail__variant">
      <Text as="span" className="product-detail__variant-label">
        Choose Size
      </Text>
      <SizeSelector
        name="size"
        sizes={uniqueSizes}
        onChange={setSelectedSizeId}
      />
    </div>
  );
};

const Actions = () => {
  const { setQuantity, selectedVariant, maxAllowed, handleMaxExceeded } = useProductCartContext();

  return (
    <div className="product-detail__actions">
      <QuantitySelector
        className="product-detail__quantity"
        onChange={setQuantity}
        max={maxAllowed}
        onMaxExceeded={handleMaxExceeded}
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
  );
};

export const ProductDetailInfo = Object.assign(Root, {
  Header,
  Price,
  Description,
  Form,
  ColorSelection,
  SizeSelection,
  Actions,
});
