import type {
  RectangleButtonColor,
  RectangleButtonSize,
  RectangleButtonVariant,
} from "../types/rectangleButton";

export const sizeStyles: Record<RectangleButtonSize, string> = {
  small:
    "box-border h-[35px] w-[72px] rounded-[8px] px-[10.63px] py-[10px] text-[14px] leading-[14px]",
  medium:
    "box-border h-[48px] rounded-[8px] px-[20px] text-[16px] leading-[28px]",
  large: "h-[56px] px-[28px] text-title-sm rounded-[8px]",
};

export const variantStyles: Record<RectangleButtonVariant, string> = {
  default: "bg-primary text-white border-none hover:bg-primary/90",
  outline: "bg-transparent border border-gray",
};

export const colorStyles: Record<RectangleButtonColor, string> = {
  subtitle: "text-fg-subtitle",
  primary: "bg-primary text-white",
  "light-gray": "bg-gray-light text-fg-secondary hover:bg-gray-light/80",
};
