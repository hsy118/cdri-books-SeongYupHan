import { AxiosError } from "axios";
import type { FetchError } from "@/components/common/types/fetch/fetch";

export function normalizeError(error: unknown): FetchError {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "요청이 실패했습니다." };
}
