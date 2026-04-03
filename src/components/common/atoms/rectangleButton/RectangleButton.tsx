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
}

function RectangleButton({
  variant = "default",
  size = "medium",
  color,
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors cursor-pointer",
        sizeStyles[size],
        variantStyles[variant],
        color && colorStyles[color],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default RectangleButton;
