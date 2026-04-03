import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import UnderLineInput from "@/components/common/atoms/UnderLineInput/UnderLineInput";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import {
  DEFAULT_SEARCH_TARGET,
  SEARCH_TARGET_OPTIONS,
} from "../../constant/searchDetail";
import type { BookSearchParams } from "../../types/searchBooks";

type SearchTarget = NonNullable<BookSearchParams["target"]>;

function SearchDetail() {
  const [target, setTarget] = useState<SearchTarget>(DEFAULT_SEARCH_TARGET);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    SEARCH_TARGET_OPTIONS.find((opt) => opt.value === target)?.label ?? "";

  const unselectedOptions = SEARCH_TARGET_OPTIONS.filter(
    (opt) => opt.value !== target,
  );

  const handleSelect = (value: SearchTarget) => {
    setTarget(value);
    setIsDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (dropdownRef.current?.contains(e.relatedTarget as Node)) return;
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) return;
    console.log("상세검색:", { target, keyword: trimmed });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div
          ref={dropdownRef}
          className="relative w-[100px]"
          onBlur={handleBlur}
        >
          <button
            type="button"
            className="flex w-full items-center justify-between text-body-md-bold text-fg-primary cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>{selectedLabel}</span>
            <ChevronDown className="size-[16px] text-gray" />
          </button>

          {isDropdownOpen && (
            <ul className="absolute left-0 top-full z-10 w-full bg-white py-1">
              {unselectedOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    tabIndex={0}
                    className="w-full text-left text-body-md text-fg-subtitle py-1 cursor-pointer hover:text-fg-primary"
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <UnderLineInput
          placeholder="검색어 입력"
          className="flex-1"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <RectangleButton
        variant="default"
        color="primary"
        size="small"
        className="w-full"
        onClick={handleSearch}
      >
        검색하기
      </RectangleButton>
    </div>
  );
}

export default SearchDetail;
