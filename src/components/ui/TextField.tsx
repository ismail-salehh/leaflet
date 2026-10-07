import { useId } from "react";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void; // a function prop: takes a string, returns nothing
  placeholder?: string;
};

// A "controlled" input: the PARENT owns the value (useState lives there).
// This component just shows it and reports changes back up via onChange.
export default function TextField({ label, value, onChange, placeholder }: TextFieldProps) {
  // useId gives a unique id so the <label> can point at the <input>.
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <input
        id={id}
        className="field__input"
        value={value}
        placeholder={placeholder}
        // e.target.value is the text currently in the box
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
