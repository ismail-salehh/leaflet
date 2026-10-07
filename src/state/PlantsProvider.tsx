import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SEED_PLANTS } from "../data/seedPlants";
import { createId } from "../utils/id";
import type { PlantDraft } from "../types/plant";
import { PlantsContext } from "./plantsContext";
import { plantsReducer, type PlantsAction } from "./plantsReducer";

export default function PlantsProvider({ children }: { children: ReactNode }) {
  // The plant list lives here, saved in localStorage so it survives a reload.
  const [plants, setPlants] = useLocalStorage("leaflet.plants", SEED_PLANTS);

  // Run an action through the reducer. Passing a FUNCTION to setPlants
  // means "here's how to compute the next value from the previous one".
  const dispatch = (action: PlantsAction) => {
    setPlants((previous) => plantsReducer(previous, action));
  };

  // Friendly named functions so components don't build action objects themselves.
  const value = {
    plants,
    addPlant: (draft: PlantDraft) => dispatch({ type: "add", plant: { id: createId(), ...draft } }),
    updatePlant: (id: string, draft: PlantDraft) => dispatch({ type: "update", id, draft }),
    deletePlant: (id: string) => dispatch({ type: "delete", id }),
    toggleWatered: (id: string) => dispatch({ type: "toggleWatered", id }),
  };

  // React 19: you can render the context itself as the provider (<Ctx value=...>).
  return <PlantsContext value={value}>{children}</PlantsContext>;
}
