import emptyPot from "../../assets/empty-pot.png";
import Button from "../ui/Button";
import { PlusIcon } from "../ui/icons";
import "./EmptyState.css";

export default function EmptyState({ onAddPlant }: { onAddPlant: () => void }) {
  return (
    <div className="empty-state">
      <img src={emptyPot} alt="" className="empty-state__image" />
      <h2 className="empty-state__title">No plants yet</h2>
      <p className="empty-state__text">Add your first plant to start tracking watering.</p>
      <Button fullWidth onClick={onAddPlant}>
        <PlusIcon /> Add your first plant
      </Button>
    </div>
  );
}
