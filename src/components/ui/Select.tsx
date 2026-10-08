import { useId } from "react";
import { ChevronDownIcon } from "./icons";
import "./field.css";
import "./Select.css";

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (newValue: string) => void;
};

export default function Select({ label, value, options, onChange }: SelectProps) {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <div className="select">
        <select
          id={id}
          className="field__input select__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {/* Rendering a list: .map() each item to JSX. Every item needs a unique "key". */}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="select__chevron" />
      </div>
    </div>
  );
}
