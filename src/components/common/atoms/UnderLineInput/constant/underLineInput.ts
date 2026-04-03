import type { UnderLineInputSize } from "../types/underLineInput";

export const sizeStyles: Record<UnderLineInputSize, string> = {
  small: "px-[9px] py-[5px] text-body-md",
  medium: "px-[12px] py-[8px] text-caption-md",
};

export const baseStyles =
  "w-full border-b border-primary bg-transparent text-black placeholder:text-fg-subtitle outline-none";
