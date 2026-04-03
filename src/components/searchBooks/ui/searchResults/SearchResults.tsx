import { useEffect, useRef } from "react";
import { useSearchBooksQuery } from "../../queries/useSearchBooksQuery";
import type { KakaoBookSearchResponse } from "../../types/searchBooks";
import SearchedBooks from "./SearchedBooks";
import SearchResultHeader from "./SearchResultHeader";

interface Props {
  keyword: string;
}

function SearchResults({ keyword }: Props) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchBooksQuery(keyword);
  const sentinelRef = useRef<HTMLDivElement>(null);

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

  const totalCount = data?.pages[0].meta.total_count ?? 0;
  const allDocuments = data?.pages.flatMap((page: KakaoBookSearchResponse) => page.documents) ?? [];
  const isFetching = isLoading || isFetchingNextPage;

  return (
    <section className="mt-7">
      <SearchResultHeader totalCount={totalCount} />
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
