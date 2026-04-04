import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchFieldTypographyClass } from "@/lib/searchFieldTypography";
import type { UnderLineInputSize } from "./types/underLineInput";
import { baseStyles, sizeStyles } from "./constant/underLineInput";

interface Props extends Omit<React.ComponentProps<typeof Input>, "size"> {
  size?: UnderLineInputSize;
}

function UnderLineInput({
  size = "small",
  className,
  ...props
}: Props) {
  return (
    <Input
      className={cn(
        "min-h-0 rounded-none border-0 border-b border-primary bg-transparent p-0 shadow-none focus-visible:border-primary focus-visible:ring-0",
        searchFieldTypographyClass,
        baseStyles,
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export default UnderLineInput;
