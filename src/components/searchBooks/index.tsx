import { useState } from "react";
import RoundedDropdownInput from "@/components/common/atoms/RoundedInput.tsx/RoundedInput";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import SearchResults from "./ui/searchResults/SearchResults";
import useSearchHistory from "./hooks/useSearchHistory";

function SearchBooks() {
  const [keyword, setKeyword] = useState("");
  const { history, addHistory, removeHistory } = useSearchHistory();

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addHistory(trimmed);
    setKeyword(trimmed);
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
          placeholder="검색어를 입력하세요"
          className="w-[480px]"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          history={history}
          onRemoveHistory={removeHistory}
          onSelectHistory={handleSelectHistory}
        />
        <RectangleButton variant="outline" size="small" color="subtitle">
          상세검색
        </RectangleButton>
      </div>
      <SearchResults />
    </>
  );
}

export default SearchBooks;
