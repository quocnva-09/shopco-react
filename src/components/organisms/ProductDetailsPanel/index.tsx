import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Text } from "@/components/atoms/Text";
import "./index.scss";

export type ProductDetailsPanelProps = ComponentPropsWithoutRef<"section"> & {
  description: string;
};

export const ProductDetailsPanel = ({
  description,
  className,
  ...rest
}: ProductDetailsPanelProps) => {
  return (
    <section className={clsx("tab-content", "details", className)} {...rest}>
      <div className="tab-content__header">
        <Heading as="h2" lineClamp={0} showTooltip={false} className="tab-content__title">
          Product Details
        </Heading>
      </div>
      <Text as="p" className="details__description">{description}</Text>
    </section>
  );
};
