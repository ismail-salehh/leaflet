import { useState } from "react";
import { useNavigate } from "react-router";
import type { WaterFilter } from "../types/plant";
import { usePlants } from "../hooks/usePlants";
import { useFilteredPlants } from "../hooks/useFilteredPlants";
import ScreenHeader from "../components/layout/ScreenHeader";
import Button from "../components/ui/Button";
import { PlusIcon } from "../components/ui/icons";
import WateringSummary from "../components/plants/WateringSummary";
import FilterTabs from "../components/plants/FilterTabs";
import PlantList from "../components/plants/PlantList";
import EmptyState from "../components/plants/EmptyState";
import PlantActionsSheet from "../components/plants/PlantActionsSheet";
import DeletePlantDialog from "../components/plants/DeletePlantDialog";
import "./css/PlantsListPage.css";

const EMPTY_FILTER_TEXT: Record<WaterFilter, string> = {
  all: "",
  "needs-water": "Every plant has been watered today.",
  watered: "No plants watered yet today.",
};

export default function PlantsListPage() {
  const { plants, toggleWatered, deletePlant } = usePlants();
  const navigate = useNavigate();

  const onAddPlant = () => navigate("/plants/new");

  // LOCAL UI state: only this page cares about it, so it lives here, not in context.
  const [filter, setFilter] = useState<WaterFilter>("all");
  const [actionsPlantId, setActionsPlantId] = useState<string | null>(null);
  const [deletingPlantId, setDeletingPlantId] = useState<string | null>(null);

  const visiblePlants = useFilteredPlants(filter);

  // We store the ID, then look up the plant. That way, if the plant changes or
  // gets deleted, we never show stale data.
  const actionsPlant = plants.find((p) => p.id === actionsPlantId) ?? null;
  const deletingPlant = plants.find((p) => p.id === deletingPlantId) ?? null;

  const hasPlants = plants.length > 0;

  return (
    <div className="screen">
      <ScreenHeader
        title="My Plants"
        action={
          hasPlants && (
            <Button size="sm" onClick={onAddPlant}>
              <PlusIcon /> Add plant
            </Button>
          )
        }
      />

      {/* On the empty screen, the Add button is big and sits above the summary */}
      {!hasPlants && (
        <Button fullWidth onClick={onAddPlant}>
          <PlusIcon /> Add plant
        </Button>
      )}

      <WateringSummary />
      <FilterTabs value={filter} onChange={setFilter} />

      {!hasPlants ? (
        <EmptyState onAddPlant={onAddPlant} />
      ) : visiblePlants.length === 0 ? (
        <p className="filter-empty">{EMPTY_FILTER_TEXT[filter]}</p>
      ) : (
        <PlantList plants={visiblePlants} onToggleWatered={toggleWatered} onMore={setActionsPlantId} />
      )}

      <PlantActionsSheet
        plant={actionsPlant}
        onClose={() => setActionsPlantId(null)}
        onEdit={(id) => {
          setActionsPlantId(null);
          navigate(`/plants/${id}/edit`);
        }}
        onDelete={(id) => {
          // Close the sheet, then open the confirm dialog for the same plant.
          setActionsPlantId(null);
          setDeletingPlantId(id);
        }}
      />

      <DeletePlantDialog
        plant={deletingPlant}
        onCancel={() => setDeletingPlantId(null)}
        onConfirm={(id) => {
          deletePlant(id);
          setDeletingPlantId(null);
        }}
      />
    </div>
  );
}
