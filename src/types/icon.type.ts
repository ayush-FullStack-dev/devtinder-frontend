import type { ComponentType } from "react";

export type IconProps = {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number | string;
};

export type IconComponent = ComponentType<IconProps>;
