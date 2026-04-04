import { useEffect, useRef } from "react";
import { useSearchPageTopSpacing } from "@/components/common/searchPageTopSpacingContext";
import { useSearchBooksQuery } from "../../queries/useSearchBooksQuery";
import type {
  BookSearchParams,
  KakaoBookSearchResponse,
} from "../../types/searchBooks";
import SearchedBooks from "./SearchedBooks";
import SearchResultHeader from "./SearchResultHeader";

interface Props {
  keyword: string;
  target?: BookSearchParams["target"];
}

function SearchResults({ keyword, target }: Props) {
  const { setCompactSearchTop } = useSearchPageTopSpacing();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchBooksQuery(keyword, target);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const totalCount = data?.pages[0].meta.total_count ?? 0;

  useEffect(() => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      setCompactSearchTop(false);
      return;
    }
    if (isLoading) {
      setCompactSearchTop(false);
      return;
    }
    setCompactSearchTop(totalCount > 0);
  }, [keyword, isLoading, totalCount, setCompactSearchTop]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allDocuments =
    data?.pages.flatMap((page: KakaoBookSearchResponse) => page.documents) ??
    [];
  const isFetching = isLoading || isFetchingNextPage;

  return (
    <section className="mt-7">
      <SearchResultHeader totalCount={totalCount} className="mb-[120px]" />
      <SearchedBooks
        books={allDocuments}
        sentinelRef={sentinelRef}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
    </section>
  );
}

export default SearchResults;
