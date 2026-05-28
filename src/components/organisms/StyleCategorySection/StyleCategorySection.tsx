import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Heading } from '@/components/atoms/Heading';
import { StyleCategoryCard, type StyleCategoryCardData } from '@/components/molecules/StyleCategoryCard';
import { defaultStyleCategories } from './StyleCategorySection.data';
import './StyleCategorySection.scss';

export type StyleCategorySectionProps = ComponentPropsWithoutRef<'section'> & {
  title: string;
  categories?: StyleCategoryCardData[];
};

export const StyleCategorySection = ({
  title,
  categories = defaultStyleCategories,
  className,
  ...rest
}: StyleCategorySectionProps) => {
  return (
    <section className={clsx('style-categories', className)} {...rest}>
      <Heading
        as="h2"
        lineClamp={0}
        className="style-categories__title"
      >
        {title}
      </Heading>

      <div className="style-categories__grid">
        {categories.map((category) => (
          <StyleCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
