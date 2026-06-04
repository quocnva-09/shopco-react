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
  /** Optional id forwarded to the <h1> for aria-labelledby on the section */
  titleId?: string;
  children: ReactNode;
};

export const MainBannerContent = ({
  title,
  description,
  stats,
  titleId,
  children,
  className,
  ...rest
}: MainBannerContentProps) => {
  return (
    <div className={clsx('main-banner__content', className)} {...rest}>
      <Heading
        as="h1"
        id={titleId}
        className="main-banner__title"
      >
        {title}
      </Heading>

      <Text as="p" className="main-banner__desc">
        {description}
      </Text>

      {children}

      <StatsBar items={stats} />
    </div>
  );
};
