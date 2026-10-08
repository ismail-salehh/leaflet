import { useEffect, type ReactNode } from "react";
import "./css/backdrop.css";
import "./css/BottomSheet.css";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  // ReactNode = anything renderable: JSX, text, numbers, null, arrays...
  children: ReactNode;
};

export default function BottomSheet({ open, onClose, children }: BottomSheetProps) {
  // Close on the Escape key. Hooks must run BEFORE any early return
  // (React needs the same hooks in the same order on every render).
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // The function you return is the "cleanup": React calls it before the
    // effect runs again or when the component disappears.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Early return: if it's closed, render nothing at all.
  if (!open) return null;

  return (
    // Clicking the dark backdrop closes the sheet...
    <div className="backdrop backdrop--bottom" onClick={onClose}>
      {/* ...but clicks INSIDE the sheet must not bubble up to the backdrop */}
      <div className="sheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="sheet__handle" />
        {children}
      </div>
    </div>
  );
}
