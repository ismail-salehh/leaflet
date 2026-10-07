import type { WaterFilter } from "../types/plant";
import { usePlants } from "./usePlants";

export function useFilteredPlants(filter: WaterFilter) {
  const { plants } = usePlants();

  if (filter === "needs-water") return plants.filter((plant) => !plant.isWateredToday);
  if (filter === "watered") return plants.filter((plant) => plant.isWateredToday);
  return plants;
}
