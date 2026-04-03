import { useInfiniteQuery } from "@tanstack/react-query";
import useFetchHandler from "@/components/common/hooks/useFetchHandler";
import type { KakaoBookSearchResponse } from "../types/searchBooks";
import { SEARCH_SIZE } from "../constant/searchBooks";

export function useSearchBooksQuery(keyword: string) {
  const { fetchHandler } = useFetchHandler();

  return useInfiniteQuery({
    queryKey: ["searchBooks", keyword],
    queryFn: ({ pageParam }) =>
      fetchHandler<KakaoBookSearchResponse>("/search/book", {
        query: keyword,
        sort: "accuracy",
        size: SEARCH_SIZE,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
    enabled: !!keyword,
  });
}
