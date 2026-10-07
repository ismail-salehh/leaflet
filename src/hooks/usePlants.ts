import { useContext } from "react";
import { PlantsContext } from "../state/plantsContext";

// Read the shared plant state from anywhere inside <PlantsProvider>.
export function usePlants() {
  const context = useContext(PlantsContext);
  if (context === null) {
    throw new Error("usePlants must be used inside <PlantsProvider>");
  }
  return context;
}
