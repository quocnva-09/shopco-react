import { type ComponentPropsWithoutRef, useMemo } from "react";
import clsx from "clsx";
import { Dropdown } from "@/components/molecules/Dropdown";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

export type SortOption = {
  id: string;
  label: string;
};

export type SortSelectorProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "onChange"
> & {
  options: SortOption[];
  value?: string;
  onChange?: (id: string) => void;
};

export const SortSelector = ({
  options,
  value,
  onChange,
  className,
  ...rest
}: SortSelectorProps) => {
  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  const menuItems = useMemo(() => {
    return options.map((opt) => ({
      id: opt.id,
      label: opt.label,
      onClick: () => onChange?.(opt.id),
      className: opt.id === value ? "is-selected" : undefined,
    }));
  }, [options, value, onChange]);

  return (
    <div className={clsx("sort-selector", className)} {...rest}>
      <span className="sort-selector__label">Sort by:</span>
      <Dropdown>
        <Dropdown.Trigger>
          <div className="sort-selector__trigger">
            <span className="sort-selector__value">
              {selectedOption?.label}
            </span>
            <IconButton
              svgName="vector-direct-down"
              variant="no-fill"
              className="sort-selector__icon"
              tabIndex={-1}
              aria-label="Open sort options"
              iconWidth={11.5}
              iconHeight={6.5}
            />
          </div>
        </Dropdown.Trigger>
        <Dropdown.Menu items={menuItems} />
      </Dropdown>
    </div>
  );
};
