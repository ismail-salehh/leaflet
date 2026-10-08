import { useEffect, type ReactNode } from "react";
import Button from "./Button";
import "./css/backdrop.css";
import "./css/ConfirmDialog.css";

type ConfirmDialogProps = {
  open: boolean;
  icon?: ReactNode;
  breadcrumb?: string[];
  title: string;
  message: string;
  warning?: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// Components can use other components: this one is built from Button.
export default function ConfirmDialog({
  open,
  icon,
  breadcrumb,
  title,
  message,
  warning,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="backdrop backdrop--center" onClick={onCancel}>
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {breadcrumb && (
          <p className="dialog__breadcrumb">
            {/* .map gives you the index too; the last item is styled differently */}
            {breadcrumb.map((item, index) => (
              <span key={item}>
                {index > 0 && " › "}
                <span className={index === breadcrumb.length - 1 ? "dialog__breadcrumb-current" : ""}>
                  {item}
                </span>
              </span>
            ))}
          </p>
        )}
        {icon && <div className="dialog__icon">{icon}</div>}
        <h2 className="dialog__title">{title}</h2>
        <p className="dialog__message">{message}</p>
        {warning && <p className="dialog__warning">{warning}</p>}
        <div className="dialog__actions">
          {/* autoFocus on the SAFE choice, so Enter doesn't delete by accident */}
          <Button variant="secondary" onClick={onCancel} autoFocus>
            {cancelLabel}
          </Button>
          <Button variant="warning" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
