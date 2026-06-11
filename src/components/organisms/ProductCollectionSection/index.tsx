import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Slider } from "@/components/molecules/Slider";
import "./index.scss";

type RootProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  showButton?: boolean;
};

const Root = ({ children, showButton = true, className, ...rest }: RootProps) => {
  return (
    <section
      className={clsx(
        "product-collection",
        !showButton && "product-collection--no-btn",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

const Header = ({ title }: { title: string }) => (
  <Heading as="h2" lineClamp={0} className="product-collection__title">
    {title}
  </Heading>
);

type ContentProps = {
  children: ReactNode;
  enableSlider?: boolean;
  autoplay?: boolean;
  showArrows?: boolean;
};

const Content = ({
  children,
  enableSlider = true,
  autoplay = false,
  showArrows = false,
}: ContentProps) => {
  const listContent = <ul className="product-collection__list">{children}</ul>;

  if (!enableSlider) {
    return listContent;
  }

  return (
    <Slider
      className="product-collection__slider"
      autoplay={autoplay}
      showArrows={showArrows}
    >
      {listContent}
    </Slider>
  );
};

const Footer = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <Button
    variant="outline"
    className="product-collection__btn"
    colorScheme="dark"
    onClick={onClick}
  >
    {label}
  </Button>
);

export const ProductCollectionSection = Object.assign(Root, {
  Header,
  Content,
  Footer,
});
