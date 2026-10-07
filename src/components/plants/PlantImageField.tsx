import type { PlantImageId } from "../../types/plant";
import { getPlantImage } from "../../data/plantImages";
import Button from "../ui/Button";
import { CloseIcon, ImageIcon } from "../ui/icons";
import PlantThumbnail from "./PlantThumbnail";

type PlantImageFieldProps = {
  image: PlantImageId | null;
  onChoose: () => void;
  onRemove: () => void;
};

export default function PlantImageField({ image, onChoose, onRemove }: PlantImageFieldProps) {
  const option = getPlantImage(image);
  const hasImage = option !== null;

  return (
    <div className="field">
      <span className="field__label">Plant image</span>
      <div className="image-field">
        <figure className="image-field__preview">
          <PlantThumbnail image={image} size="md" />
          {hasImage && <figcaption>{option.label} image</figcaption>}
        </figure>

        <div className="image-field__buttons">
          <Button variant="secondary" fullWidth onClick={onChoose}>
            <ImageIcon /> {hasImage ? "Change plant image" : "Choose plant image"}
          </Button>
          {hasImage && (
            <Button variant="muted" size="sm" fullWidth onClick={onRemove}>
              <CloseIcon width={16} height={16} /> Remove image
            </Button>
          )}
          <p className="image-field__hint">
            {hasImage
              ? "Choose an illustration or use no image."
              : "Choose from the supplied plant illustrations."}
          </p>
        </div>
      </div>
    </div>
  );
}
