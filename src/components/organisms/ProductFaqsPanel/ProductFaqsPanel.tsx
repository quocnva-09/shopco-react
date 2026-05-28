import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text";
import "./ProductFaqsPanel.scss";

export type ProductFaqsPanelProps = ComponentPropsWithoutRef<"section"> & {
  content: string;
};

export const ProductFaqsPanel = ({
  content,
  className,
  ...rest
}: ProductFaqsPanelProps) => {
  return (
    <section className={clsx("tab-content", "faqs", className)} {...rest}>
      <div className="tab-content__header">
        <Heading as="h2" lineClamp={0} showTooltip={false} className="tab-content__title">
          Frequently Asked Questions
        </Heading>
      </div>
      <Text as="p">{content}</Text>
    </section>
  );
};
