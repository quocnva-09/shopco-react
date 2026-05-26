import { useEffect, useState, type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import './Image.scss';

export interface ImageProps extends ComponentPropsWithoutRef<'img'> {
  fallbackSrc?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  aspectRatio?: number | string;
  fit?: CSSProperties['objectFit'];
  objectPosition?: CSSProperties['objectPosition'];
  showPlaceholder?: boolean;
  isLoaded?: boolean;
  isError?: boolean;
  loadedClassName?: string;
  errorClassName?: string;
  renderWrapper?: boolean;
}

export const Image = ({
  src,
  fallbackSrc,
  alt,
  className,
  imgClassName,
  placeholderClassName,
  width,
  height,
  aspectRatio,
  fit = 'cover',
  objectPosition,
  showPlaceholder = false,
  isLoaded: externalIsLoaded,
  isError: externalIsError,
  loadedClassName = 'is-loaded',
  errorClassName = 'is-error',
  renderWrapper = true,
  onLoad,
  onError,
  ...rest
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [internalIsLoaded, setInternalIsLoaded] = useState(false);
  const [internalIsError, setInternalIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setInternalIsLoaded(false);
    setInternalIsError(false);
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setInternalIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setInternalIsError(false);
    } else {
      setInternalIsError(true);
    }
    onError?.(e);
  };

  const finalIsLoaded = externalIsLoaded ?? internalIsLoaded;
  const finalIsError = externalIsError ?? internalIsError;

  // Xử lý Style inline
  const baseStyles: CSSProperties = {
    width,
    height,
    aspectRatio: aspectRatio !== undefined ? String(aspectRatio) : undefined,
    objectFit: fit,
    objectPosition,
  };

  const resolvedImgClassName = clsx(
    renderWrapper && 'image-wrapper__img',
    imgClassName,
    finalIsLoaded && loadedClassName,
    finalIsError && errorClassName
  );

  // TRƯỜNG HỢP 1: Render thuần thẻ <img> không có div bọc ngoài
  if (!renderWrapper) {
    return (
      <img
        className={clsx('image-bare', className, resolvedImgClassName)}
        src={imgSrc || ''}
        alt={alt}
        style={baseStyles}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    );
  }

  // TRƯỜNG HỢP 2: Render đầy đủ wrapper hỗ trợ Trạng thái Loading / Placeholder
  return (
    <div 
      className={clsx(
        'image-wrapper', 
        finalIsLoaded && 'image-wrapper--loaded',
        finalIsError && 'image-wrapper--error',
        className
      )} 
      style={{ width, height, aspectRatio: aspectRatio !== undefined ? String(aspectRatio) : undefined }}
    >
      <img
        className={resolvedImgClassName}
        src={imgSrc || ''}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: fit, objectPosition }}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
      {showPlaceholder && (
        <span 
          className={clsx('image-wrapper__placeholder', placeholderClassName)} 
          aria-hidden="true" 
        />
      )}
    </div>
  );
};