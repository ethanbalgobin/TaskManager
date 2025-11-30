import { createContext } from "react";
import type { ConfirmDialogOptions, ConfirmDialogResult } from "./types";

export interface ConfirmDialogContextValue {
  confirm: (options: ConfirmDialogOptions) => ConfirmDialogResult;
}

export const ConfirmDialogContext = createContext<
  ConfirmDialogContextValue | undefined
>(undefined);
