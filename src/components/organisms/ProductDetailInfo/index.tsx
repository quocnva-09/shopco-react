import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
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
    <div className="product-detail__header-name-wrapper">
      <Heading
        as="h2"
        className="product-detail__name"
        showTooltip={true}
        mobileShowTooltip={false}
        mobileLineClamp={0}
        lineClamp={1}
      >
        {name}
      </Heading>
    </div>
    <Rating
      value={ratingAvg ?? 0}
      className="product-detail__rating"
      size="lg"
    />
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
  <div className="product-detail__description-wrapper">
    <Text
      as="p"
      className="product-detail__description"
      showTooltip={true}
      mobileShowTooltip={false}
      mobileLineClamp={0}
      lineClamp={2}
    >
      {children}
    </Text>
  </div>
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
  const { setQuantity, selectedVariant, maxAllowed, handleMaxExceeded } =
    useProductCartContext();

  const [isExceeded, setIsExceeded] = useState(false);

  const handleChange = (value: number) => {
    setIsExceeded(false);
    setQuantity(value);
  };

  const handleExceeded = () => {
    setIsExceeded(true);
    handleMaxExceeded();
  };

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isExceeded) {
      // Prevent the form's onSubmit from firing while quantity is still out-of-range.
      e.preventDefault();
      e.stopPropagation();
      handleMaxExceeded();
      // Commit the clamped value so the NEXT submit goes through with the correct quantity.
      // QuantitySelector's display already shows Math.max(1, maxAllowed); sync the context.
      setQuantity(Math.max(1, maxAllowed));
      setIsExceeded(false);
    }
  };

  return (
    <div className="product-detail__actions">
      <QuantitySelector
        className="product-detail__quantity"
        onChange={handleChange}
        max={maxAllowed}
        onMaxExceeded={handleExceeded}
      />
      <Button
        variant="solid"
        type="submit"
        className="product-detail__btn"
        disabled={!selectedVariant}
        onClick={handleSubmitClick}
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
