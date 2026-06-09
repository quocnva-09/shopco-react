import { type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import "./index.scss";

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
}

export type TabsVariant = "default" | "profile";

export type TabsProps = ComponentPropsWithoutRef<"div"> & {
  tabs: TabItem[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  variant?: TabsVariant;
};

export const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
  className,
  ...rest
}: TabsProps) => {
  return (
    <div
      className={clsx(
        "tabs",
        variant !== "default" && `tabs--${variant}`,
        className
      )}
      role="tablist"
      {...rest}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === activeTab}
          className={clsx(
            "tabs__item",
            tab.id === activeTab && "tabs__item--active"
          )}
          // TODO: onClick will call onTabChange once useState is implemented
          onClick={() => onTabChange?.(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
