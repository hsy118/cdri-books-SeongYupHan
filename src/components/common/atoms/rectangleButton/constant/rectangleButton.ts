import type {
  RectangleButtonColor,
  RectangleButtonSize,
  RectangleButtonVariant,
} from "../types/rectangleButton";

export const sizeStyles: Record<RectangleButtonSize, string> = {
  small: "px-[10px] py-[5px] text-body-md rounded-[8px]",
  medium: "px-[20px] py-[13px] text-caption-md rounded-[8px]",
};

export const variantStyles: Record<RectangleButtonVariant, string> = {
  default: "bg-primary text-white border-none hover:bg-primary/90",
  outline: "bg-transparent border border-gray",
};

export const colorStyles: Record<RectangleButtonColor, string> = {
  subtitle: "text-fg-subtitle",
  primary: "bg-primary text-white",
  "light-gray": "bg-gray-light text-secondary",
};
