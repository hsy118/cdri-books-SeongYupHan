import { delay, http, HttpResponse } from "msw";
import type { KakaoBookDocument } from "@/components/shared/types/book";
import { createSearchResponse, bookFixtures } from "../fixtures/books";

type CapturedSearchRequest = {
  query: string | null;
  target: string | null;
  page: string | null;
  size: string | null;
  sort: string | null;
};

const searchRequestLog: CapturedSearchRequest[] = [];

function captureSearchRequest(request: Request) {
  const url = new URL(request.url);

  searchRequestLog.push({
    query: url.searchParams.get("query"),
    target: url.searchParams.get("target"),
    page: url.searchParams.get("page"),
    size: url.searchParams.get("size"),
    sort: url.searchParams.get("sort"),
  });
}

export function getSearchRequestLog() {
  return searchRequestLog;
}

export function resetSearchRequestLog() {
  searchRequestLog.length = 0;
}

export function searchSuccessHandler(options?: {
  documents?: KakaoBookDocument[];
  delayMs?: number;
}) {
  const { documents = bookFixtures, delayMs = 0 } = options ?? {};

  return http.get("https://dapi.kakao.com/v3/search/book", async ({ request }) => {
    captureSearchRequest(request);

    if (delayMs > 0) {
      await delay(delayMs);
    }

    return HttpResponse.json(createSearchResponse(documents));
  });
}

export function searchEmptyHandler(options?: { delayMs?: number }) {
  const { delayMs = 0 } = options ?? {};

  return http.get("https://dapi.kakao.com/v3/search/book", async ({ request }) => {
    captureSearchRequest(request);

    if (delayMs > 0) {
      await delay(delayMs);
    }

    return HttpResponse.json(createSearchResponse([]));
  });
}

export function searchErrorHandler(options?: {
  message?: string;
  status?: number;
  delayMs?: number;
}) {
  const {
    message = "검색 중 오류가 발생했습니다.",
    status = 500,
    delayMs = 0,
  } = options ?? {};

  return http.get("https://dapi.kakao.com/v3/search/book", async ({ request }) => {
    captureSearchRequest(request);

    if (delayMs > 0) {
      await delay(delayMs);
    }

    return HttpResponse.json({ message }, { status });
  });
}

export const handlers = [searchSuccessHandler()];
