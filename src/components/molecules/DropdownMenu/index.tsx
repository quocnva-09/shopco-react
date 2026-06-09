import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import { MenuList, type MenuItem } from "@/components/molecules/MenuList";
import "./index.scss";
import { useClickOutside } from "@/hooks/useClickOutside";

export type { MenuItem };

export type DropdownMenuProps = ComponentPropsWithoutRef<"div"> & {
  title: string;
  items: MenuItem[];
};

export const DropdownMenu = ({
  title,
  items,
  className,
  ...rest
}: DropdownMenuProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const dropDownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
  useClickOutside(dropDownRef, closeDropdown);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const handleDropdownClick = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    [],
  );

  return (
    <div
      className={clsx("dropdown", isDropdownOpen && "is-open", className)}
      {...rest}
      ref={dropDownRef}
    >
      <div className="dropdown__trigger" onClick={handleDropdownClick}>
        <Text className="dropdown__text">{title}</Text>
        <Icon
          svgName="icn-arrow-down"
          aria-label="icn-arrow-down"
          className="dropdown__icon"
        />
      </div>

      {isDropdownOpen && <MenuList items={items} className="dropdown__menu" />}
    </div>
  );
};
