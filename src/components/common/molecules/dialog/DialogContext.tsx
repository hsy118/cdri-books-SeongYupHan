import { createContext, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import type { DialogContextValue, DialogOptions } from "./types/dialog";

export const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogOptions | null>(null);
  const close = useCallback(() => setDialogState(null), []);

  const openDialog = useCallback(
    (options: DialogOptions) => setDialogState(options),
    [],
  );

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={!!dialogState} onOpenChange={(open) => !open && close()}>
        <DialogContent showCloseButton={false} className="sm:max-w-[280px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <DialogHeader>
            {dialogState?.title && (
              <DialogTitle>{dialogState.title}</DialogTitle>
            )}
            <DialogDescription className="text-body-md text-black">
              {dialogState?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <RectangleButton size="small" color="primary" onClick={close}>
              확인
            </RectangleButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
