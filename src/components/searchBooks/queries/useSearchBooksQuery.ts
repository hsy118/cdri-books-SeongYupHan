import { useInfiniteQuery } from "@tanstack/react-query";
import useFetchHandler from "@/components/common/hooks/useFetchHandler";
import type {
  BookSearchParams,
  KakaoBookSearchResponse,
} from "../types/searchBooks";
import { SEARCH_SIZE } from "../constant/searchBooks";

export function useSearchBooksQuery(
  keyword: string,
  target?: BookSearchParams["target"],
) {
  const { fetchHandler } = useFetchHandler();

  return useInfiniteQuery({
    queryKey: ["searchBooks", keyword, target],
    queryFn: ({ pageParam }) =>
      fetchHandler<KakaoBookSearchResponse>("/search/book", {
        query: keyword,
        sort: "accuracy",
        size: SEARCH_SIZE,
        page: pageParam,
        ...(target && { target }),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.meta.is_end ? undefined : lastPageParam + 1,
    enabled: !!keyword,
  });
}
