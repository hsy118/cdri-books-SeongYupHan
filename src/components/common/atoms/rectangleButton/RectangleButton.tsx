import { cn } from "@/lib/utils";
import type {
  RectangleButtonColor,
  RectangleButtonSize,
  RectangleButtonVariant,
} from "./types/rectangleButton";
import {
  colorStyles,
  sizeStyles,
  variantStyles,
} from "./constant/rectangleButton";

interface Props extends Omit<React.ComponentProps<"button">, "size" | "color"> {
  variant?: RectangleButtonVariant;
  size?: RectangleButtonSize;
  color?: RectangleButtonColor;
  fixedWidth?: number;
}

function RectangleButton({
  variant = "default",
  size = "medium",
  color,
  fixedWidth,
  className,
  children,
  style,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors cursor-pointer",
        sizeStyles[size],
        variantStyles[variant],
        color && colorStyles[color],
        fixedWidth && "px-0",
        className,
      )}
      style={fixedWidth ? { width: fixedWidth, ...style } : style}
      {...props}
    >
      {children}
    </button>
  );
}

export default RectangleButton;
