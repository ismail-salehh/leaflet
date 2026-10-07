import type { Plant } from "../../types/plant";
import ConfirmDialog from "../ui/ConfirmDialog";
import { TrashIcon } from "../ui/icons";

type DeletePlantDialogProps = {
  plant: Plant | null; // null = dialog closed
  breadcrumb?: string[];
  onConfirm: (id: string) => void;
  onCancel: () => void;
};

// A "specialised" version of the generic ConfirmDialog: it fills in the plant-specific text.
export default function DeletePlantDialog({ plant, breadcrumb, onConfirm, onCancel }: DeletePlantDialogProps) {
  // "?." = optional chaining: if plant is null, this gives undefined instead of crashing.
  const name = plant?.name ?? "";

  return (
    <ConfirmDialog
      open={plant !== null}
      icon={<TrashIcon width={28} height={28} />}
      breadcrumb={breadcrumb}
      title={`Delete ${name}?`}
      message={`This will remove ${name} from your list.`}
      warning="This can't be undone."
      confirmLabel="Delete plant"
      cancelLabel="Keep plant"
      onConfirm={() => plant && onConfirm(plant.id)}
      onCancel={onCancel}
    />
  );
}
