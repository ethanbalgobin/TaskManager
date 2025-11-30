export interface ConfirmDialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export type ConfirmDialogResult = Promise<boolean>;
