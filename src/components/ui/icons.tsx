import type { ComponentProps } from "react";

// One file, many NAMED exports. Import them like: import { TrashIcon } from "./icons";
// Every icon accepts normal <svg> props (className, width, ...) via ...props.
type IconProps = ComponentProps<"svg">;

// Shared defaults: 24x24 grid, drawn with lines in the current text color.
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PlusIcon = (props: IconProps) => (
  <Svg {...props}><path d="M12 5v14M5 12h14" /></Svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <Svg {...props}><path d="M15 18l-6-6 6-6" /></Svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Svg {...props}><path d="M9 18l6-6-6-6" /></Svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <Svg {...props}><path d="M6 9l6 6 6-6" /></Svg>
);

export const MoreIcon = (props: IconProps) => (
  <Svg {...props} strokeWidth="3"><path d="M5 12h.01M12 12h.01M19 12h.01" /></Svg>
);

export const TrashIcon = (props: IconProps) => (
  <Svg {...props}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" /></Svg>
);

export const PencilIcon = (props: IconProps) => (
  <Svg {...props}><path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" /></Svg>
);

export const ImageIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="M21 16l-5-5-9 9" />
  </Svg>
);

export const CloseIcon = (props: IconProps) => (
  <Svg {...props}><path d="M6 6l12 12M18 6L6 18" /></Svg>
);

export const CheckIcon = (props: IconProps) => (
  <Svg {...props} strokeWidth="3"><path d="M5 12l5 5 9-10" /></Svg>
);
