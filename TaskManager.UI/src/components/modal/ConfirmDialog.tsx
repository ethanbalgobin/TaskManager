import "../../styles/components/_confirm-dialog.scss";
import type { ConfirmDialogOptions } from "./types";

export default function ConfirmDialog({
  options,
  onClose,
}: {
  options: ConfirmDialogOptions | null;
  onClose: (result: boolean) => void;
}) {
  if (!options) return null;

  return (
    <div className="confirm-overlay" onClick={() => onClose(false)}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{options.title ?? "Confirm Action"}</h3>
        <p>{options.message}</p>

        <div className="confirm-buttons">
          <button className="btn-cancel" onClick={() => onClose(false)}>
            {options.cancelText ?? "Cancel"}
          </button>

          <button className="btn-confirm" onClick={() => onClose(true)}>
            {options.confirmText ?? "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
