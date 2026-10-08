import type { Plant } from "../../types/plant";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { MoreIcon } from "../ui/icons";
import PlantThumbnail from "./PlantThumbnail";
import "./css/PlantCard.css";

type PlantCardProps = {
  plant: Plant;
  onToggleWatered: (id: string) => void;
  onMore: (id: string) => void;
};

export default function PlantCard({ plant, onToggleWatered, onMore }: PlantCardProps) {
  // Destructure the fields we use so the JSX below stays short.
  const { id, name, room, image, isWateredToday, wateringFrequency } = plant;
  const frequencyText = wateringFrequency === 1 ? "every day" : `every ${wateringFrequency} days`;

  return (
    <article className="plant-card card">
      <PlantThumbnail image={image} size="sm" />

      <div className="plant-card__info">
        <div className="plant-card__top">
          <h3 className="plant-card__name">{name}</h3>
          <button
            type="button"
            className="icon-btn"
            aria-label={`More actions for ${name}`}
            onClick={() => onMore(id)}
          >
            <MoreIcon />
          </button>
        </div>
        <p className="plant-card__meta">
          {room} · {frequencyText}
        </p>
        <div className="plant-card__bottom">
          {isWateredToday ? (
            <Badge tone="success" label="Watered today" />
          ) : (
            <Badge tone="warning" label="Needs water" />
          )}
          <Button
            size="sm"
            variant={isWateredToday ? "muted" : "warning"}
            onClick={() => onToggleWatered(id)}
          >
            {isWateredToday ? "Mark as needs water" : "Mark as watered"}
          </Button>
        </div>
      </div>
    </article>
  );
}
