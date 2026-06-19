import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import {
  StyleCategoryCard,
  type StyleCategoryCardData,
} from "@/components/molecules/StyleCategoryCard";
import { defaultStyleCategories } from "./StyleCategorySection.data";
import "./index.scss";
import { useNavigate } from "react-router-dom";

export type StyleCategorySectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
  categories?: StyleCategoryCardData[];
};

export const StyleCategorySection = ({
  title,
  categories = defaultStyleCategories,
  className,
  ...rest
}: StyleCategorySectionProps) => {
  const navigate = useNavigate();
  return (
    <section className={clsx("style-categories", className)} {...rest}>
      <Heading as="h2" lineClamp={0} className="style-categories__title">
        {title}
      </Heading>

      <div className="style-categories__grid">
        {categories.map((category) => (
          <StyleCategoryCard
            key={category.id}
            category={category}
            onClick={(e) => {
              if (category.href && category.href !== "#") {
                e.preventDefault();
                navigate(category.href);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};
