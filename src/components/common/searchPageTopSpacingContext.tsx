import { createContext, useContext } from "react";

type SearchPageTopSpacingContextValue = {
  setCompactSearchTop: (compact: boolean) => void;
};

export const SearchPageTopSpacingContext =
  createContext<SearchPageTopSpacingContextValue | null>(null);

export function useSearchPageTopSpacing() {
  const ctx = useContext(SearchPageTopSpacingContext);
  if (!ctx) {
    throw new Error(
      "useSearchPageTopSpacing must be used within ContentWrapper",
    );
  }
  return ctx;
}
