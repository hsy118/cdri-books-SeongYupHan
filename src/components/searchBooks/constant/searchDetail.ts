import type { BookSearchParams } from "../types/searchBooks";

type SearchTarget = NonNullable<BookSearchParams["target"]>;

interface SearchTargetOption {
  label: string;
  value: SearchTarget;
}

export const SEARCH_TARGET_OPTIONS: SearchTargetOption[] = [
  { label: "제목", value: "title" },
  { label: "저자명", value: "person" },
  { label: "출판사", value: "publisher" },
];

export const DEFAULT_SEARCH_TARGET: SearchTarget = "title";
