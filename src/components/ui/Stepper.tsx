import { useId } from "react";
import "./css/field.css";
import "./css/Stepper.css";

type StepperProps = {
  label?: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  unit?: string;
};

export default function Stepper({ label, value, onChange, min = 1, max = 60, unit }: StepperProps) {
  const labelId = useId();

  // Small helper functions defined inside the component.
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="field">
      {label && (
        <span id={labelId} className="field__label">
          {label}
        </span>
      )}
      {/* role="group" + aria-labelledby tells screen readers these controls belong to the label */}
      <div className="stepper" role="group" aria-labelledby={label ? labelId : undefined}>
        <button
          type="button"
          className="stepper__btn"
          onClick={decrement}
          disabled={value <= min}
          aria-label="Decrease"
        >
          −
        </button>
        <span className="stepper__value" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className="stepper__btn"
          onClick={increment}
          disabled={value >= max}
          aria-label="Increase"
        >
          +
        </button>
        {/* "&&" renders the right side only if the left side is truthy */}
        {unit && <span className="stepper__unit">{unit}</span>}
      </div>
    </div>
  );
}
