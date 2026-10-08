import ProgressBar from "../ui/ProgressBar";
import { useWateringStats } from "../../hooks/useWateringStats";
import "./css/WateringSummary.css";

// This component gets its data from a hook instead of props.
// Anything that changes the plants re-renders it automatically.
export default function WateringSummary() {
  const { watered, total, percent } = useWateringStats();

  return (
    <section className="summary card" aria-label="Watering progress">
      <div>
        <p className="summary__label">Watered today</p>
        <p className="summary__count">
          {watered}/{total}
        </p>
      </div>
      <div className="summary__bar">
        <ProgressBar value={percent} />
        <span className="summary__percent">{percent}%</span>
      </div>
    </section>
  );
}
