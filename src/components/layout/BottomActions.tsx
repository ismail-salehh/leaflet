import type { ReactNode } from "react";
import "./BottomActions.css";

// A bar that sticks to the bottom of the screen and holds the Cancel / Save buttons.
// It's just a styled wrapper: whatever you put inside becomes "children".
export default function BottomActions({ children }: { children: ReactNode }) {
  return <div className="bottom-actions">{children}</div>;
}
