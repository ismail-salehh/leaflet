import { CheckIcon, ImageIcon } from "../ui/icons";
import "./ImageOptionCard.css";

type ImageOptionCardProps = {
  label: string;
  src: string | null; // null = the "No image" tile
  selected: boolean;
  onSelect: () => void;
};

export default function ImageOptionCard({ label, src, selected, onSelect }: ImageOptionCardProps) {
  return (
    <button
      type="button"
      className={`image-option ${selected ? "image-option--selected" : ""} ${src ? "" : "image-option--none"}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {selected && (
        <span className="image-option__check">
          <CheckIcon width={14} height={14} />
        </span>
      )}

      {src ? (
        <img src={src} alt="" className="image-option__img" />
      ) : (
        <span className="image-option__placeholder">
          <ImageIcon width={36} height={36} />
        </span>
      )}

      {selected && src && <span className="image-option__pill">Selected</span>}
      <span className="image-option__label">{label}</span>
    </button>
  );
}
