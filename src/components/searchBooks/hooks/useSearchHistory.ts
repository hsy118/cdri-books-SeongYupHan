import { useSyncExternalStore } from "react";
import { MAX_HISTORY } from "../constant/searchHistory";
import {
  getLocalHistory,
  setLocalHistory,
  subscribe,
} from "../utils/searchHistoryStorage";

function useSearchHistory() {
  const history = useSyncExternalStore(subscribe, getLocalHistory, () => []);

  const addHistory = (keyword: string) => {
    const trimmed = keyword.trim();
    if (!trimmed) return;

    const prev = getLocalHistory();
    const item = { id: crypto.randomUUID(), keyword: trimmed };
    const next = [...prev, item].slice(-MAX_HISTORY);
    setLocalHistory(next);
  };

  const removeHistory = (id: string) => {
    const prev = getLocalHistory();
    setLocalHistory(prev.filter((item) => item.id !== id));
  };

  return { history, addHistory, removeHistory } as const;
}

export default useSearchHistory;
