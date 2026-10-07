import type { Plant } from "../../types/plant";
import BottomSheet from "../ui/BottomSheet";
import Button from "../ui/Button";
import { PencilIcon, TrashIcon } from "../ui/icons";
import PlantThumbnail from "./PlantThumbnail";

type PlantActionsSheetProps = {
  plant: Plant | null; // null = sheet closed
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
};

export default function PlantActionsSheet({ plant, onEdit, onDelete, onClose }: PlantActionsSheetProps) {
  return (
    <BottomSheet open={plant !== null} onClose={onClose}>
      {/* BottomSheet renders nothing when closed, but TypeScript doesn't know that,
          so we still check plant before reading plant.name */}
      {plant && (
        <>
          <div className="actions-sheet__head">
            <PlantThumbnail image={plant.image} size="sm" />
            <h2 className="actions-sheet__title">{plant.name}</h2>
            <p className="actions-sheet__subtitle">Choose an action</p>
          </div>
          <Button variant="secondary" fullWidth className="btn--left" onClick={() => onEdit(plant.id)}>
            <PencilIcon /> Edit plant
          </Button>
          <Button variant="warning-soft" fullWidth className="btn--left" onClick={() => onDelete(plant.id)}>
            <TrashIcon /> Delete plant
          </Button>
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </>
      )}
    </BottomSheet>
  );
}
