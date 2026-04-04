import { useSyncExternalStore } from "react";
import type { KakaoBookDocument } from "@/components/shared/types/book";
import {
  addFavorite,
  getLocalFavorites,
  isFavorite,
  removeFavorite,
  subscribe,
} from "../utils/favoritesStorage";

function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getLocalFavorites, () => []);

  const toggleFavorite = (book: KakaoBookDocument) => {
    if (isFavorite(book)) {
      removeFavorite(book);
    } else {
      addFavorite(book);
    }
  };

  const checkIsFavorite = (book: KakaoBookDocument): boolean => {
    return isFavorite(book);
  };

  return { favorites, toggleFavorite, checkIsFavorite } as const;
}

export default useFavorites;
