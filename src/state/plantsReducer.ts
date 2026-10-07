import type { Plant, PlantDraft } from "../types/plant";

// Every change you can make to the plant list, described as data.
// This is a "discriminated union": the `type` field tells TypeScript
// which other fields exist (e.g. only "update" has a `draft` AND an `id`).
export type PlantsAction =
  | { type: "add"; plant: Plant }
  | { type: "update"; id: string; draft: PlantDraft }
  | { type: "delete"; id: string }
  | { type: "toggleWatered"; id: string };

// A reducer is a PURE function: (old state, action) => new state.
// It never mutates `plants`; it always returns a NEW array.
// That's how React notices something changed.
export function plantsReducer(plants: Plant[], action: PlantsAction): Plant[] {
  switch (action.type) {
    case "add":
      return [...plants, action.plant]; // copy old items, add the new one at the end

    case "update":
      return plants.map((plant) =>
        plant.id === action.id ? { ...plant, ...action.draft } : plant,
      );

    case "delete":
      return plants.filter((plant) => plant.id !== action.id);

    case "toggleWatered":
      return plants.map((plant) =>
        plant.id === action.id ? { ...plant, isWateredToday: !plant.isWateredToday } : plant,
      );
  }
}
