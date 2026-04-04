import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FetchingIndicatorVariant = "panel" | "inline";

const DEFAULT_MESSAGES: Record<FetchingIndicatorVariant, string> = {
  panel: "검색 결과를 가져오는 중이에요",
  inline: "가져오는 중...",
};

export interface FetchingIndicatorProps {
  variant: FetchingIndicatorVariant;
  message?: string;
  className?: string;
}

function FetchingIndicator({
  variant,
  message,
  className,
}: FetchingIndicatorProps) {
  const label = message ?? DEFAULT_MESSAGES[variant];

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "mt-4 flex items-center justify-center gap-2.5 py-2 text-fg-subtitle",
          className,
        )}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Loader2
          className="size-5 shrink-0 animate-spin text-primary"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-caption-md">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl bg-gray-light px-6 py-14 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-[0px_0px_4px_0px_#00000026]">
        <Loader2
          className="size-7 animate-spin text-primary"
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <p className="text-caption-md text-fg-secondary">{label}</p>
    </div>
  );
}

export default FetchingIndicator;
