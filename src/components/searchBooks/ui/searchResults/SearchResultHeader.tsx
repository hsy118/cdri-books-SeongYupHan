import { cn } from "@/lib/utils";

interface Props {
  totalCount: number;
  className?: string;
}

function SearchResultHeader({ totalCount, className }: Props) {
  return (
    <header className={cn("flex items-center gap-4 h-6 text-caption-md", className)}>
      <h2>도서 검색 결과</h2>
      <p>
        총 <span className="text-primary">{totalCount}</span>건
      </p>
    </header>
  );
}

export default SearchResultHeader;
