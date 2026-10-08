import { useState } from "react";
import type { PlantImageId } from "../types/plant";
import { PLANT_IMAGES } from "../data/plantImages";
import ScreenHeader from "../components/layout/ScreenHeader";
import BottomActions from "../components/layout/BottomActions";
import Button from "../components/ui/Button";
import ImageOptionCard from "../components/plants/ImageOptionCard";
import "./ChooseImagePage.css";

type ChooseImagePageProps = {
  initialImage: PlantImageId | null;
  backLabel: string;
  onCancel: () => void;
  onConfirm: (image: PlantImageId | null) => void;
};

export default function ChooseImagePage({ initialImage, backLabel, onCancel, onConfirm }: ChooseImagePageProps) {
  // A temporary choice. The form only changes if the user taps "Use selected image".
  // Cancel throws this state away.
  const [selected, setSelected] = useState<PlantImageId | null>(initialImage);

  return (
    <div className="screen">
      <ScreenHeader
        title="Choose plant image"
        subtitle="Pick an illustration for this plant."
        backLabel={backLabel}
        onBack={onCancel}
      />

      <div className="image-grid">
        <ImageOptionCard
          label="No image"
          src={null}
          selected={selected === null}
          onSelect={() => setSelected(null)}
        />
        {PLANT_IMAGES.map((option) => (
          <ImageOptionCard
            key={option.id}
            label={option.label}
            src={option.src}
            selected={selected === option.id}
            onSelect={() => setSelected(option.id)}
          />
        ))}
      </div>

      <BottomActions>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(selected)}>Use selected image</Button>
      </BottomActions>
    </div>
  );
}
