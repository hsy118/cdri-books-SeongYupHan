import { useState } from "react";
import { X } from "lucide-react";
import RoundedDropdownInput from "@/components/common/atoms/RoundedDropdownInput/RoundedDropdownInput";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchResults from "./ui/searchResults/SearchResults";
import SearchDetail from "./ui/searchResults/SearchDetail";
import useSearchHistory from "./hooks/useSearchHistory";

function SearchBooks() {
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { history, addHistory, removeHistory } = useSearchHistory();

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addHistory(trimmed);
    setKeyword(trimmed);
    setSearchKeyword(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(keyword);
    }
  };

  const handleSelectHistory = (selected: string) => {
    setKeyword(selected);
    handleSearch(selected);
  };

  return (
    <>
      <h1 className="text-title-lg">도서 검색</h1>
      <div className="flex items-center gap-4 mt-6">
        <RoundedDropdownInput
          placeholder="검색어 입력"
          className="w-[480px]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          history={history}
          onRemoveHistory={removeHistory}
          onSelectHistory={handleSelectHistory}
        />
        <Popover>
          <PopoverTrigger
            render={
              <RectangleButton variant="outline" size="small" color="subtitle">
                상세검색
              </RectangleButton>
            }
          />
          <PopoverContent
            align="center"
            sideOffset={16}
            className="relative w-[360px] p-2 shadow-[0px_4px_14px_6px_#97979726]"
          >
            <PopoverClose className="absolute top-2 right-2 cursor-pointer">
              <X className="size-[20px] text-gray-400" />
            </PopoverClose>
            <SearchDetail />
          </PopoverContent>
        </Popover>
      </div>
      <SearchResults keyword={searchKeyword} />
    </>
  );
}

export default SearchBooks;
