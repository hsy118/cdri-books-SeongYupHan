import type { KakaoBookDocument } from "@/components/shared/types/book";
import type { KakaoBookSearchResponse } from "@/components/searchBooks/types/searchBooks";

export const bookFixtures: KakaoBookDocument[] = [
  {
    title: "리액트 테스트 입문",
    contents: "프론트엔드 테스트 전략을 다루는 책입니다.",
    url: "https://example.com/react-testing",
    isbn: "1111111111111",
    datetime: "2026-04-01T00:00:00.000+09:00",
    authors: ["테스터 한승엽"],
    publisher: "프론트출판사",
    translators: [],
    price: 22000,
    sale_price: 18000,
    thumbnail: "https://example.com/react-testing.jpg",
    status: "정상판매",
  },
  {
    title: "타입스크립트 실전 가이드",
    contents: "타입 안정성과 유지보수 전략을 설명합니다.",
    url: "https://example.com/typescript-guide",
    isbn: "2222222222222",
    datetime: "2026-03-20T00:00:00.000+09:00",
    authors: ["개발자 한승엽"],
    publisher: "엔지니어링북스",
    translators: [],
    price: 28000,
    sale_price: 0,
    thumbnail: "https://example.com/typescript-guide.jpg",
    status: "정상판매",
  },
];

export function createSearchResponse(
  documents: KakaoBookDocument[] = bookFixtures,
): KakaoBookSearchResponse {
  return {
    meta: {
      total_count: documents.length,
      pageable_count: documents.length,
      is_end: true,
    },
    documents,
  };
}
