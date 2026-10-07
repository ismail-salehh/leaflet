import type { Plant } from "../types/plant";

// Starter plants for the first time the app opens (same as the mockup).
// Delete them all in the app to see the empty state.
export const SEED_PLANTS: Plant[] = [
  { id: "seed-1", name: "Monstera", room: "Living Room", image: "monstera", isWateredToday: true, wateringFrequency: 7 },
  { id: "seed-2", name: "Snake Plant", room: "Bedroom", image: "snake-plant", isWateredToday: false, wateringFrequency: 14 },
  { id: "seed-3", name: "Basil", room: "Kitchen", image: "basil", isWateredToday: false, wateringFrequency: 2 },
  { id: "seed-4", name: "Aloe Vera", room: "Bathroom", image: "aloe-vera", isWateredToday: true, wateringFrequency: 21 },
  { id: "seed-5", name: "Boston Fern", room: "Hallway", image: "boston-fern", isWateredToday: false, wateringFrequency: 3 },
  { id: "seed-6", name: "Succulent Trio", room: "Office", image: "succulent-trio", isWateredToday: true, wateringFrequency: 10 },
];
