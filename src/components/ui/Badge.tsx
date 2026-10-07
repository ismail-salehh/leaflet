import dropGreen from "../../assets/icons/drop-green.png";
import dropOrange from "../../assets/icons/drop-orange.png";

type BadgeTone = "success" | "warning";

type BadgeProps = {
  tone: BadgeTone;
  label: string;
};

export default function Badge({ tone, label }: BadgeProps) {
  const icon = tone === "success" ? dropGreen : dropOrange;

  return (
    <span className={`badge badge--${tone}`}>
      <img src={icon} alt="" className="badge__icon" />
      {label}
    </span>
  );
}
