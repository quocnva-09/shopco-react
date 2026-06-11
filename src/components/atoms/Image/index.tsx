import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export type ImageProps = ComponentPropsWithoutRef<"img"> & {
  fallbackSrc?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  showPlaceholder?: boolean;
  isLoaded?: boolean;
  isError?: boolean;
  loadedClassName?: string;
  errorClassName?: string;
  renderWrapper?: boolean;
};

export const Image = ({
  src,
  fallbackSrc = "/default.png",
  alt,
  className,
  imgClassName,
  placeholderClassName,
  showPlaceholder = false,
  isLoaded: externalIsLoaded,
  isError: externalIsError,
  loadedClassName = "is-loaded",
  errorClassName = "is-error",
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

  const resolvedImgClassName = clsx(
    renderWrapper && "image-wrapper__img",
    imgClassName,
    finalIsLoaded && loadedClassName,
    finalIsError && errorClassName,
  );

  // CASE 1: Render a bare <img> tag without an outer wrapper div
  if (!renderWrapper) {
    return (
      <img
        className={clsx("image-bare", className, resolvedImgClassName)}
        src={imgSrc || ""}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    );
  }

  // CASE 2: Render full wrapper with Loading / Placeholder state support
  return (
    <figure
      className={clsx(
        "image-wrapper",
        finalIsLoaded && "image-wrapper--loaded",
        finalIsError && "image-wrapper--error",
        className,
      )}
    >
      <img
        className={resolvedImgClassName}
        src={imgSrc || ""}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
      {showPlaceholder && (
        <span
          className={clsx("image-wrapper__placeholder", placeholderClassName)}
          aria-hidden="true"
        />
      )}
    </figure>
  );
};
