import { useContext } from "react";
import { DialogContext } from "@/components/common/molecules/dialog/DialogContext";

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("다이얼로그 프로바이더가 없습니다.");
  }
  return context;
}

export default useDialog;
