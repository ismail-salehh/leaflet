import type { PlantImageId } from "../types/plant";
// Importing a .png gives you its URL as a string; Vite copies the file for you.
import monstera from "../assets/plants/monstera.png";
import snakePlant from "../assets/plants/snake-plant.png";
import basil from "../assets/plants/basil.png";
import aloeVera from "../assets/plants/aloe-vera.png";
import bostonFern from "../assets/plants/boston-fern.png";
import succulentTrio from "../assets/plants/succulent-trio.png";

export type PlantImageOption = {
  id: PlantImageId;
  label: string;
  src: string;
};

export const PLANT_IMAGES: PlantImageOption[] = [
  { id: "monstera", label: "Monstera", src: monstera },
  { id: "snake-plant", label: "Snake Plant", src: snakePlant },
  { id: "basil", label: "Basil", src: basil },
  { id: "aloe-vera", label: "Aloe Vera", src: aloeVera },
  { id: "boston-fern", label: "Boston Fern", src: bostonFern },
  { id: "succulent-trio", label: "Succulent Trio", src: succulentTrio },
];

// Look up an image by id. "?? null" turns "not found" (undefined) into null.
export function getPlantImage(id: PlantImageId | null): PlantImageOption | null {
  return PLANT_IMAGES.find((image) => image.id === id) ?? null;
}
