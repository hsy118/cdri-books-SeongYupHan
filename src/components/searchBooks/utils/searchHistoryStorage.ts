import { STORAGE_KEY } from "../constant/searchHistory";
import type { HistoryItem } from "../types/searchHistory";

const EMPTY: HistoryItem[] = [];

let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedSnapshot: HistoryItem[] = EMPTY;

/**
 * 캐시를 무효화하고 등록된 리스너들에게 변경을 알리는 함수
 */
export function emitChange() {
  cachedRaw = null;
  listeners.forEach((listener) => listener());
}

/**
 * localStorage에서 검색 기록을 읽어 반환하는 함수
 * 동일한 원본 문자열이면 캐싱된 배열 참조를 재사용
 */
export function getLocalHistory(): HistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    cachedSnapshot = raw ? (JSON.parse(raw) as HistoryItem[]) : EMPTY;
  } catch {
    cachedSnapshot = EMPTY;
  }
  return cachedSnapshot;
}

/**
 * 검색 기록을 localStorage에 저장하고 변경을 알리는 함수수
 */
export function setLocalHistory(next: HistoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emitChange();
}

/**
 * 검색 기록 변경을 구독하는 함수. useSyncExternalStore의 subscribe로 사용
 */
export function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}