import { useState, useCallback } from "react";
import axiosInstance from "@/apis";
import useDialog from "@/components/common/molecules/dialog/hooks/useDialog";
import { normalizeError } from "@/components/common/utils/fetch/fetch";

function useFetchHandler() {
  const [isLoading, setIsLoading] = useState(false);
  const { openDialog } = useDialog();

  const fetchHandler = useCallback(
    async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get<T>(url, { params });
        return data;
      } catch (err) {
        const normalized = normalizeError(err);
        openDialog({ description: normalized.message });
        throw normalized;
      } finally {
        setIsLoading(false);
      }
    },
    [openDialog],
  );

  return { fetchHandler, isLoading } as const;
}

export default useFetchHandler;
