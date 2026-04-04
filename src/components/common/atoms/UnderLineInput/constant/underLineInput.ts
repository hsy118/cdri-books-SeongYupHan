import type { UnderLineInputSize } from "../types/underLineInput";

export const sizeStyles: Record<UnderLineInputSize, string> = {
  small: "pt-0 pb-[5px] pl-[9.45px] pr-[9.45px]",
  medium: "pt-0 pb-[8px] pl-[12px] pr-[12px]",
};

export const baseStyles =
  "w-full border-b border-primary bg-transparent text-black placeholder:text-fg-subtitle outline-none";
