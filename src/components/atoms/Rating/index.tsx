import { type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import './index.scss';

export type RatingVariant = 'default' | 'row';

export type RatingProps = ComponentPropsWithoutRef<'div'> & {
  value: number;
  showText?: boolean;
  variant?: RatingVariant;
  starSize?: number;
  starGap?: number;
};

export const Rating = ({
  value,
  showText = true,
  variant = 'default',
  starSize,
  starGap,
  className,
  ...rest
}: RatingProps) => {
  const roundedValue = Math.round(value * 2) / 2;
  const displayRating = roundedValue % 1 === 0 ? `${roundedValue}.0` : roundedValue;

  // 2. Calculate the actual number of stars to render
  const fullStarsCount = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;

  const fullStarsArray = Array.from({ length: fullStarsCount });

  return (
    <div 
      className={clsx(
        variant === 'row' ? 'rating-row' : 'rating-container', 
        className
      )} 
      {...rest}
    >
      <div
        className="rating"
        style={{
          ...(starSize !== undefined && { '--star-size': `${starSize}px` } as React.CSSProperties),
          ...(starGap !== undefined && { '--star-gap': `${starGap}px` } as React.CSSProperties),
        }}
      >
        {fullStarsArray.map((_, index) => (
          <span key={`full-${index}`} className="rating__star rating__star--full" aria-hidden="true" />
        ))}

        {hasHalfStar && (
          <span className="rating__star rating__star--half" aria-hidden="true" />
        )}
      </div>

      {showText && (
        <p className="rating__text">
          {displayRating}<span>/5</span>
        </p>
      )}
    </div>
  );
};