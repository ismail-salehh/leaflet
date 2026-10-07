import type { ComponentProps } from "react";

// A "union type": variant can ONLY be one of these strings.
// TypeScript will error if you write variant="blue".
type ButtonVariant = "primary" | "secondary" | "warning" | "warning-soft" | "muted" | "ghost";
type ButtonSize = "md" | "sm";

// ComponentProps<"button"> = every prop a normal <button> accepts
// (onClick, disabled, type, children, ...). We add our own on top with "&".
type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant; // "?" means optional
  size?: ButtonSize;
  fullWidth?: boolean;
};

// Props are destructured in the parameter list.
// "variant = 'primary'" is a default value if the caller leaves it out.
// "...rest" collects everything else (onClick, disabled, ...).
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button", // safer default: inside a <form>, a plain <button> would submit it
  className = "",
  children,
  ...rest
}: ButtonProps) {
  // Build the class string with a template literal.
  const classes = `btn btn--${variant} btn--${size} ${fullWidth ? "btn--full" : ""} ${className}`;

  // {...rest} spreads the remaining props onto the real <button>.
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
