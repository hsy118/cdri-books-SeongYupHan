import { STORAGE_KEY } from "../constant/searchHistory";

const EMPTY: string[] = [];

let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedSnapshot: string[] = EMPTY;

/**
 * 캐시를 무효화하고 등록된 리스너들에게 변경을 알린다.
 */
export function emitChange() {
  cachedRaw = null;
  listeners.forEach((listener) => listener());
}

/**
 * localStorage에서 검색 기록을 읽어 반환한다.
 * 동일한 원본 문자열이면 캐싱된 배열 참조를 재사용한다.
 * @returns 검색 기록 배열
 */
export function getLocalHistory(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  try {
    cachedSnapshot = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cachedSnapshot = EMPTY;
  }
  return cachedSnapshot;
}

/**
 * 검색 기록을 localStorage에 저장하고 변경을 알린다.
 * @param next - 저장할 검색 기록 배열
 */
export function setLocalHistory(next: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emitChange();
}

/**
 * 검색 기록 변경을 구독한다. useSyncExternalStore의 subscribe로 사용된다.
 * @param listener - 변경 시 호출될 콜백
 * @returns 구독 해제 함수
 */
export function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
