import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  keyword: string;
}

interface Props
  extends Omit<React.ComponentProps<typeof Input>, "type"> {
  showSearchIcon?: boolean;
  history?: HistoryItem[];
  onRemoveHistory?: (id: string) => void;
  onSelectHistory?: (keyword: string) => void;
}

function RoundedDropdownInput({
  showSearchIcon = true,
  history,
  onRemoveHistory,
  onSelectHistory,
  className,
  onKeyDown,
  onChange,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasHistory = history && history.length > 0;
  const showDropdown = isFocused && hasHistory;

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setIsFocused(true);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setIsFocused(false);
    onKeyDown?.(e);
  };

  const handleSelect = (keyword: string) => {
    onSelectHistory?.(keyword);
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="relative" onBlur={handleBlur}>
      {showSearchIcon && (
        <Search
          className={cn(
            "absolute left-[10px] top-[15px] size-[20px] text-fg-primary z-10",
          )}
        />
      )}
      <Input
        type="text"
        className={cn(
          "h-[50px] p-[10px] bg-gray-light border-none text-caption-md text-black placeholder:text-fg-subtitle focus-visible:ring-0",
          showSearchIcon && "pl-[41px]",
          showDropdown ? "rounded-t-[25px] rounded-b-none" : "rounded-full",
          className,
        )}
        onFocus={() => setIsFocused(true)}
        onClick={() => setIsFocused(true)}
        {...props}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-gray-light rounded-b-[25px] pb-[10px] z-10">
          {[...history].reverse().map((item) => (
            <li key={item.id}>
              <div
                tabIndex={-1}
                className="flex w-full items-center justify-between px-[41px] py-[6px] text-caption-md md:text-sm text-fg-subtitle outline-none"
              >
                <span
                  className="truncate cursor-pointer"
                  onClick={() => handleSelect(item.keyword)}
                >
                  {item.keyword}
                </span>
                <X
                  className="shrink-0 size-[16px] text-black cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveHistory?.(item.id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoundedDropdownInput;
