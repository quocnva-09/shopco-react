import { type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "./index.scss";

// 1. Extends all standard <a> element attributes (id, target, rel, onClick, style, etc.)
export type TextLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string; // Enforces href as a required prop for a link element
  children: React.ReactNode;
};

const isInternal = (href: string) => {
  if (!href) return false;
  return href.startsWith("/") && !href.startsWith("//");
};

export const TextLink = ({
  href,
  className,
  children,
  ...rest // 2. Collects all remaining standard HTML attributes (target, rel, onClick, id, etc.) into rest
}: TextLinkProps) => {
  const internal = isInternal(href);
  const combinedClassName = clsx("text-link", className);

  // Case 1: Internal path → use React Router <Link> for client-side navigation (no full page reload)
  if (internal) {
    return (
      <Link 
        to={href} 
        className={combinedClassName} 
        {...rest} // 3. Forwards target, rel, etc. automatically to <Link>
      >
        {children}
      </Link>
    );
  }

  // Case 2: External URL (e.g. facebook, google, etc.) → use a traditional <a> tag
  return (
    <a 
      href={href} 
      className={combinedClassName} 
      {...rest} // 3. Forwards target, rel, etc. down to the native <a> element
    >
      {children}
    </a>
  );
};