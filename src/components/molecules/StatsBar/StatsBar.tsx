import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import './StatsBar.scss';

export interface StatItemData {
  value: string;
  label: string;
}

export type StatsBarProps = ComponentPropsWithoutRef<'ul'> & {
  items: StatItemData[];
};

export const StatsBar = ({
  items,
  className,
  ...rest
}: StatsBarProps) => {
  return (
    <ul className={clsx('stats-bar', className)} {...rest}>
      {items.map((item) => (
        <li key={item.label} className="stats-bar__item">
          <span className="stats-bar__value">{item.value}</span>
          <span className="stats-bar__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
};
