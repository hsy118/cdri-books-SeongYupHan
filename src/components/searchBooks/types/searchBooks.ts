import type { KakaoBookDocument } from "@/components/shared/types/book";

export type { KakaoBookDocument };

export interface BookSearchParams {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}

export interface KakaoBookMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoBookSearchResponse {
  meta: KakaoBookMeta;
  documents: KakaoBookDocument[];
}
