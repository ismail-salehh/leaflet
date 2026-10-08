import type { Plant } from "../../types/plant";
import PlantCard from "./PlantCard";
import "./PlantList.css";

type PlantListProps = {
  plants: Plant[];
  onToggleWatered: (id: string) => void;
  onMore: (id: string) => void;
};

export default function PlantList({ plants, onToggleWatered, onMore }: PlantListProps) {
  return (
    <ul className="plant-list">
      {/* key={plant.id}: React uses the key to track which card is which between renders */}
      {plants.map((plant) => (
        <li key={plant.id}>
          <PlantCard plant={plant} onToggleWatered={onToggleWatered} onMore={onMore} />
        </li>
      ))}
    </ul>
  );
}
