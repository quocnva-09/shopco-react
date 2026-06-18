import { type ReactNode } from "react";
import clsx from "clsx";
import "./index.scss";

export type CategoryLayoutProps = {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
};

export const CategoryLayout = ({
  sidebar,
  children,
  className,
}: CategoryLayoutProps) => {
  return (
    <div className={clsx("category-layout", className)}>
      <div className="category-layout__sidebar">{sidebar}</div>
      <div className="category-layout__content">{children}</div>
    </div>
  );
};
