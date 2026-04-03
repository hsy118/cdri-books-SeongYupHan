interface Props {
  totalCount: number;
}

function SearchResultHeader({ totalCount }: Props) {
  return (
    <header className="flex items-center gap-4 h-6 text-caption-md">
      <h2>도서 검색 결과</h2>
      <p>
        총 <span className="text-primary">{totalCount}</span>건
      </p>
    </header>
  );
}

export default SearchResultHeader;
