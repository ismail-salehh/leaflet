import { createContext } from "react";
import type { Plant, PlantDraft } from "../types/plant";

// The shape of what every component gets from usePlants().
export type PlantsContextValue = {
  plants: Plant[];
  addPlant: (draft: PlantDraft) => void;
  updatePlant: (id: string, draft: PlantDraft) => void;
  deletePlant: (id: string) => void;
  toggleWatered: (id: string) => void;
};

// A Context lets any component deep in the tree read a value
// without passing it through every component in between ("prop drilling").
// It starts as null; PlantsProvider fills it in.
export const PlantsContext = createContext<PlantsContextValue | null>(null);
