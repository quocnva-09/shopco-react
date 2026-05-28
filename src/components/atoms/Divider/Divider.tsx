import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import './Divider.scss';

export type DividerDirection = 'vertical' | 'horizontal';

export type DividerProps = ComponentPropsWithoutRef<'div'> & {
  direction?: DividerDirection;
};

export const Divider = ({
  direction = 'vertical',
  className,
  ...rest
}: DividerProps) => {
  return (
    <div
      className={clsx(
        'divider',
        `divider--${direction}`,
        className
      )}
      role="separator"
      aria-orientation={direction}
      {...rest}
    />
  );
};
