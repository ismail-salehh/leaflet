import type { PlantImageId } from "../../types/plant";
import { getPlantImage } from "../../data/plantImages";
import { ImageIcon } from "../ui/icons";
import "./PlantThumbnail.css";

type PlantThumbnailProps = {
  image: PlantImageId | null;
  size?: "sm" | "md" | "lg";
};

export default function PlantThumbnail({ image, size = "md" }: PlantThumbnailProps) {
  const option = getPlantImage(image);

  // Two completely different outputs depending on the data: that's normal in React.
  if (option === null) {
    return (
      <div className={`thumb thumb--${size} thumb--empty`}>
        <ImageIcon width={28} height={28} />
        <span>No image</span>
      </div>
    );
  }

  return (
    <div className={`thumb thumb--${size}`}>
      <img src={option.src} alt={option.label} />
    </div>
  );
}
