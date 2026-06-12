import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { MenuList, type MenuItem } from "@/components/molecules/MenuList";
import { useClickOutside } from "@/hooks/useClickOutside";
import "./index.scss";

export type { MenuItem };

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown compound components must be used within a Dropdown");
  }
  return context;
};

export type DropdownProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Root = ({ children, className, ...rest }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useClickOutside(ref, close);

  // Auto-close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div
        className={clsx("dropdown", isOpen && "is-open", className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// --- Trigger Component ---
type TriggerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Trigger = ({ children, className, ...rest }: TriggerProps) => {
  const { toggle, isOpen } = useDropdownContext();

  return (
    <div
      className={clsx("dropdown__trigger-wrapper", className)}
      onClick={toggle}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      {...rest}
    >
      {children}
    </div>
  );
};

// --- Menu Component ---
type MenuProps = ComponentPropsWithoutRef<typeof MenuList> & {
  items: MenuItem[];
};

const Menu = ({ items, className, ...rest }: MenuProps) => {
  const { isOpen, close } = useDropdownContext();

  if (!isOpen) return null;

  const handleMenuClick = (e: React.MouseEvent<HTMLUListElement>) => {
    close();
    rest.onClick?.(e);
  };

  return (
    <MenuList
      items={items}
      className={clsx("dropdown__menu", className)}
      role="listbox"
      {...rest}
      onClick={handleMenuClick}
    />
  );
};

export const Dropdown = Object.assign(Root, {
  Trigger,
  Menu,
});
