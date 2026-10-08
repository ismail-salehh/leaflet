import "./css/ProgressBar.css";
type ProgressBarProps = {
  value: number; // 0 to 100
};

export default function ProgressBar({ value }: ProgressBarProps) {
  // Plain JS inside the component body runs on every render.
  const clamped = Math.min(100, Math.max(0, value));

  // style takes an OBJECT (double braces: {} for JS, {} for the object).
  return (
    <div className="progress">
      <div className="progress__fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
