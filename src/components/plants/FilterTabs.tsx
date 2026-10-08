import type { WaterFilter } from "../../types/plant";
import { useWateringStats } from "../../hooks/useWateringStats";
import "./FilterTabs.css";

type FilterTabsProps = {
  value: WaterFilter;
  onChange: (filter: WaterFilter) => void;
};

// Data that never changes lives OUTSIDE the component (not re-created every render).
const TABS: { id: WaterFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "needs-water", label: "Needs Water" },
  { id: "watered", label: "Watered" },
];

export default function FilterTabs({ value, onChange }: FilterTabsProps) {
  const { total, needsWater, watered } = useWateringStats();

  // Record<K, V> = an object whose keys are K and values are V.
  const counts: Record<WaterFilter, number> = {
    all: total,
    "needs-water": needsWater,
    watered,
  };

  return (
    <div className="filters" role="group" aria-label="Filter plants">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`filters__tab ${value === tab.id ? "filters__tab--active" : ""}`}
          aria-pressed={value === tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label} ({counts[tab.id]})
        </button>
      ))}
    </div>
  );
}
