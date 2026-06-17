import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";
import { FilterHeader } from "@/components/molecules/FilterHeader";
import "./index.scss";

type FilterGroupContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const FilterGroupContext = createContext<FilterGroupContextType | null>(null);

export const useFilterGroupContext = () => {
  const context = useContext(FilterGroupContext);
  if (!context) {
    throw new Error(
      "FilterGroup compound components must be used within a FilterGroup",
    );
  }
  return context;
};

export type FilterGroupProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  defaultOpen?: boolean;
};

const Root = ({
  children,
  className,
  defaultOpen = true,
  ...rest
}: FilterGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <FilterGroupContext.Provider value={{ isOpen, toggle }}>
      <div
        className={clsx(
          "filter-group",
          isOpen && "filter-group--open",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </FilterGroupContext.Provider>
  );
};

export type FilterGroupHeaderProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
};

const Header = ({ title, className, ...rest }: FilterGroupHeaderProps) => {
  const { isOpen, toggle } = useFilterGroupContext();

  return (
    <FilterHeader
      title={title}
      className={clsx("filter-group__header", className)}
      onClick={toggle}
      isOpen={isOpen}
      iconName="icn-arrow-down"
      iconWidth={11.5}
      iconHeight={6.5}
      {...rest}
    />
  );
};

export type FilterGroupContentProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Content = ({ children, className, ...rest }: FilterGroupContentProps) => {
  const { isOpen } = useFilterGroupContext();

  if (!isOpen) return null;

  return (
    <div className={clsx("filter-group__content", className)} {...rest}>
      {children}
    </div>
  );
};

export const FilterGroup = Object.assign(Root, {
  Header,
  Content,
});
