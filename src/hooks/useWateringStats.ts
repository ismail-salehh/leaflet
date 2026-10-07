import { usePlants } from "./usePlants";

// Derived data: we never STORE these numbers, we compute them from the list
// on every render. That's why counts update instantly after one tap.
export function useWateringStats() {
  const { plants } = usePlants();

  const total = plants.length;
  const watered = plants.filter((plant) => plant.isWateredToday).length;
  const needsWater = total - watered;
  const percent = total === 0 ? 0 : Math.round((watered / total) * 100);

  return { total, watered, needsWater, percent };
}
