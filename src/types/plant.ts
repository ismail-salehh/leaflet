// Every illustration the app ships with. A union of string literals means
// TypeScript knows the ONLY valid values, so typos like "monstra" are errors.
export type PlantImageId =
  | "monstera"
  | "snake-plant"
  | "basil"
  | "aloe-vera"
  | "boston-fern"
  | "succulent-trio";

// "export" makes the type importable from other files.
export interface Plant {
  id: string;
  name: string;
  room: string;
  image: PlantImageId | null; // null = "No image"
  isWateredToday: boolean;
  wateringFrequency: number; // in days
}

// What the Add/Edit form works with: a Plant without its id.
// Omit<Type, "key"> is a built-in helper that removes a key from a type.
export type PlantDraft = Omit<Plant, "id">;

// The three filter tabs on the list page.
export type WaterFilter = "all" | "needs-water" | "watered";
