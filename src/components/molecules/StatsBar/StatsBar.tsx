import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Divider } from '../../atoms/Divider';
import './StatsBar.scss';

export interface StatItemData {
  value: string;
  label: string;
}

export type StatsBarProps = ComponentPropsWithoutRef<'div'> & {
  items: StatItemData[];
};

export const StatsBar = ({
  items,
  className,
  ...rest
}: StatsBarProps) => {
  return (
    <div className={clsx('stats-bar', className)} {...rest}>
      {items.map((item, index) => (
        <div key={item.label} className="stats-bar__entry">
          <div className="stats-bar__item">
            <span className="stats-bar__value">{item.value}</span>
            <span className="stats-bar__label">{item.label}</span>
          </div>
          {index < items.length - 1 && (
            <Divider
              direction="vertical"
              className="stats-bar__divider"
            />
          )}
        </div>
      ))}
    </div>
  );
};
