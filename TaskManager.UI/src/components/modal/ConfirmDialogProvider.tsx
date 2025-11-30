import { useState } from "react";
import { ConfirmDialogContext } from "./ConfirmDialogContext";
import ConfirmDialog from "./confirmDialog";
import type { ConfirmDialogOptions } from "./types";

export function ConfirmDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
  const [resolver, setResolver] = useState<((result: boolean) => void) | null>(
    null
  );

  function confirm(opts: ConfirmDialogOptions) {
    return new Promise<boolean>((resolve) => {
      setOptions(opts);
      setResolver(() => resolve);
    });
  }

  function handleClose(result: boolean) {
    if (resolver) resolver(result);
    setOptions(null);
    setResolver(null);
  }

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog options={options} onClose={handleClose} />
    </ConfirmDialogContext.Provider>
  );
}
