import { ReactSVG, type Props as ReactSVGProps } from "react-svg";
import clsx from "clsx";
import { toCssDimension } from "@/utils/css";
import "./Icon.scss";

export type IconProps = Omit<ReactSVGProps, "src"> & {
  svgName: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  preserveColors?: boolean;
};

export const Icon = ({
  svgName,
  className,
  style,
  color,
  size = "1em",
  width,
  height,
  preserveColors = false,
  ...rest
}: IconProps) => {
  const defaultSize = preserveColors ? "100%" : size;
  const finalWidth = width ?? defaultSize;
  const finalHeight = height ?? defaultSize;
  const resolvedWidth = toCssDimension(finalWidth);
  const resolvedHeight = toCssDimension(finalHeight);

  return (
    <ReactSVG
      src={`/images/${svgName}.svg`}
      className={clsx("icon", className)}
      wrapper="span"
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        color,
        ...style,
      }}
      beforeInjection={(svg) => {
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");

        if (preserveColors) {
          svg.setAttribute("width", "100%");
          svg.setAttribute("height", "100%");
        } else {
          svg.setAttribute("width", resolvedWidth);
          svg.setAttribute("height", resolvedHeight);

          svg.querySelectorAll("*").forEach((el) => {
            if (el.getAttribute("fill"))
              el.setAttribute("fill", "currentColor");
            if (el.getAttribute("stroke"))
              el.setAttribute("stroke", "currentColor");
          });
        }
      }}
      {...rest}
    />
  );
};
