import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { PlantDraft } from "../types/plant";
import { usePlants } from "../hooks/usePlants";
import { ROOMS } from "../data/rooms";
import ScreenHeader from "../components/layout/ScreenHeader";
import BottomActions from "../components/layout/BottomActions";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import Select from "../components/ui/Select";
import Stepper from "../components/ui/Stepper";
import Toggle from "../components/ui/Toggle";
import { TrashIcon } from "../components/ui/icons";
import PlantImageField from "../components/plants/PlantImageField";
import DeletePlantDialog from "../components/plants/DeletePlantDialog";
import ChooseImagePage from "./ChooseImagePage";
import "./css/PlantFormPage.css";

type PlantFormPageProps = {
  plantId?: string; // given = Edit mode, missing = Add mode
};

const EMPTY_DRAFT: PlantDraft = {
  name: "",
  room: ROOMS[0],
  image: null,
  isWateredToday: false,
  wateringFrequency: 7,
};

export default function PlantFormPage({ plantId }: PlantFormPageProps) {
  const { plants, addPlant, updatePlant, deletePlant } = usePlants();
  const navigate = useNavigate();
  const onDone = () => navigate("/");
  const existingPlant = plants.find((p) => p.id === plantId) ?? null;
  const isEditing = plantId !== undefined;

  // The form's working copy. Nothing is saved until the user taps Save.
  // Lazy initializer: copy the existing plant's fields once, on the first render.
  const [draft, setDraft] = useState<PlantDraft>(() =>
    existingPlant
      ? {
          name: existingPlant.name,
          room: existingPlant.room,
          image: existingPlant.image,
          isWateredToday: existingPlant.isWateredToday,
          wateringFrequency: existingPlant.wateringFrequency,
        }
      : EMPTY_DRAFT,
  );
  const [isPickingImage, setIsPickingImage] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // One setter for every field. <K extends keyof PlantDraft> means
  // "K is one of the draft's keys", and PlantDraft[K] is that key's type.
  // So updateField("wateringFrequency", "abc") is a type error.
  function updateField<K extends keyof PlantDraft>(key: K, value: PlantDraft[K]) {
    // Copy the old draft and overwrite one key. [key] = "use the variable as the key name".
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  // Edit mode but the plant is gone (e.g. deleted): nothing to edit.
  if (isEditing && existingPlant === null) {
    return (
      <div className="screen">
        <ScreenHeader title="Plant not found" backLabel="My Plants" onBack={onDone} />
      </div>
    );
  }

  // Showing the picker INSTEAD of the form keeps the draft alive in this
  // component's state while the user picks an image.
  if (isPickingImage) {
    return (
      <ChooseImagePage
        initialImage={draft.image}
        backLabel={isEditing ? "Edit plant" : "Add plant"}
        onCancel={() => setIsPickingImage(false)}
        onConfirm={(image) => {
          updateField("image", image);
          setIsPickingImage(false);
        }}
      />
    );
  }

  const trimmedName = draft.name.trim();
  const canSave = trimmedName.length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser from reloading the page (default form behavior)
    if (!canSave) return;

    const cleanDraft = { ...draft, name: trimmedName };
    if (existingPlant) {
      updatePlant(existingPlant.id, cleanDraft);
    } else {
      addPlant(cleanDraft);
    }
    onDone();
  }

  return (
    <div className="screen">
      <ScreenHeader
        title={isEditing ? "Edit plant" : "Add plant"}
        backLabel="My Plants"
        onBack={onDone}
        breadcrumb={isEditing ? ["More actions", "Edit plant"] : undefined}
      />

      {/* onSubmit fires on the Save button AND when pressing Enter in the name field */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="card form__card">
          <PlantImageField
            image={draft.image}
            onChoose={() => setIsPickingImage(true)}
            onRemove={() => updateField("image", null)}
          />
          <TextField
            label="Plant name"
            value={draft.name}
            placeholder="e.g. Peace Lily"
            onChange={(name) => updateField("name", name)}
          />
          <Select
            label="Room"
            value={draft.room}
            options={ROOMS}
            onChange={(room) => updateField("room", room)}
          />
          <Stepper
            label="Watering frequency"
            value={draft.wateringFrequency}
            unit="days"
            onChange={(days) => updateField("wateringFrequency", days)}
          />
          <Toggle
            label="Watered today?"
            checked={draft.isWateredToday}
            onChange={(checked) => updateField("isWateredToday", checked)}
          />

          {isEditing && (
            <div className="form__danger">
              <Button variant="ghost" className="btn--left" onClick={() => setIsConfirmingDelete(true)}>
                <TrashIcon /> Delete plant
              </Button>
            </div>
          )}
        </div>

        <BottomActions>
          <Button variant="secondary" onClick={onDone}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canSave}>
            {isEditing ? "Save changes" : "Save plant"}
          </Button>
        </BottomActions>
      </form>

      <DeletePlantDialog
        plant={isConfirmingDelete ? existingPlant : null}
        breadcrumb={["Edit plant", "Delete plant"]}
        onCancel={() => setIsConfirmingDelete(false)}
        onConfirm={(id) => {
          deletePlant(id);
          onDone();
        }}
      />
    </div>
  );
}
