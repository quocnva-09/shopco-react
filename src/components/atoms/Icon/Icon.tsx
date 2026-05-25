import { ReactSVG, type Props as ReactSVGProps } from "react-svg";
import clsx from "clsx";
import { toCssDimension } from "@/utils/css";
import styles from './Icon.module.scss'


export interface IconProps extends Omit<ReactSVGProps, "src">{
  svgName: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
};

export const Icon = (
  {
    svgName,
    className,
    style,
    color,
    size = "1em",
    width,
    height,
    ...rest
  }: IconProps) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const resolvedWidth = toCssDimension(finalWidth);
  const resolvedHeight = toCssDimension(finalHeight);

  
  return (
    <ReactSVG
      src={`/images/${svgName}.svg`}
      className={clsx(styles.icon, className)}
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
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        svg.querySelectorAll("*").forEach((el) => {
          if (el.getAttribute("fill")) el.setAttribute("fill", "currentColor");
          if (el.getAttribute("stroke")) el.setAttribute("stroke", "currentColor");
        });
      }}
      {...rest}
    />
  );
}