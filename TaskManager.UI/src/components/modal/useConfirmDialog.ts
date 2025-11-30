import { useContext } from "react";
import { ConfirmDialogContext } from "./ConfirmDialogContext";

export function useConfirmDialog() {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx)
    throw new Error(
      "useConfirmDialog must be used within ConfirmDialogProvider."
    );
  return ctx;
}
