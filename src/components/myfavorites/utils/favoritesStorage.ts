import type { KakaoBookDocument } from "@/components/shared/types/book";
import { FAVORITES_STORAGE_KEY } from "../constant/favorites";

const EMPTY: KakaoBookDocument[] = [];

let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedSnapshot: KakaoBookDocument[] = EMPTY;

function emitChange() {
  cachedRaw = null;
  listeners.forEach((listener) => listener());
}

export function getLocalFavorites(): KakaoBookDocument[] {
  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    cachedSnapshot = raw ? (JSON.parse(raw) as KakaoBookDocument[]) : EMPTY;
  } catch {
    cachedSnapshot = EMPTY;
  }
  return cachedSnapshot;
}

export function setLocalFavorites(next: KakaoBookDocument[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  emitChange();
}

export function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getBookId(book: KakaoBookDocument): string {
  return book.isbn || book.title;
}

export function addFavorite(book: KakaoBookDocument) {
  const prev = getLocalFavorites();
  const id = getBookId(book);
  if (prev.some((b) => getBookId(b) === id)) return;
  setLocalFavorites([...prev, book]);
}

export function removeFavorite(book: KakaoBookDocument) {
  const prev = getLocalFavorites();
  const id = getBookId(book);
  setLocalFavorites(prev.filter((b) => getBookId(b) !== id));
}

export function isFavorite(book: KakaoBookDocument): boolean {
  const favorites = getLocalFavorites();
  const id = getBookId(book);
  return favorites.some((b) => getBookId(b) === id);
}
