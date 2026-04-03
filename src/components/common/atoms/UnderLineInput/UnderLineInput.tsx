import { cn } from "@/lib/utils";
import type { UnderLineInputSize } from "./types/underLineInput";
import { baseStyles, sizeStyles } from "./constant/underLineInput";

interface Props extends Omit<React.ComponentProps<"input">, "size"> {
  size?: UnderLineInputSize;
}

function UnderLineInput({
  size = "small",
  className,
  ...props
}: Props) {
  return (
    <input
      className={cn(baseStyles, sizeStyles[size], className)}
      {...props}
    />
  );
}

export default UnderLineInput;
