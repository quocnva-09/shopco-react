import { type ReactNode, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import { StatsBar, type StatItemData } from '../StatsBar';
import './MainBannerContent.scss';

export type MainBannerContentProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  description: string;
  stats: StatItemData[];
  children: ReactNode; // Slot cho CTA Button
};

export const MainBannerContent = ({
  title,
  description,
  stats,
  children,
  className,
  ...rest
}: MainBannerContentProps) => {
  return (
    <div className={clsx('main-banner__content', className)} {...rest}>
      <Heading
        as="h1"
        className="main-banner__title"
      >
        {title}
      </Heading>

      <Text className="main-banner__desc">
        {description}
      </Text>

      {children}

      <StatsBar items={stats} />
    </div>
  );
};
