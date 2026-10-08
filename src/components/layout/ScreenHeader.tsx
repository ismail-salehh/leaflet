import type { ReactNode } from "react";
import { ChevronLeftIcon } from "../ui/icons";
import "./css/ScreenHeader.css";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
  breadcrumb?: string[];
  action?: ReactNode; // e.g. the "+ Add plant" button next to the title
};

export default function ScreenHeader({
  title,
  subtitle,
  backLabel,
  onBack,
  breadcrumb,
  action,
}: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      {onBack && (
        <button type="button" className="screen-header__back" onClick={onBack}>
          <ChevronLeftIcon />
          {backLabel}
        </button>
      )}

      {breadcrumb && (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1;
            return (
              <span key={item} className={isLast ? "breadcrumb__current" : ""}>
                {index > 0 && <span className="breadcrumb__sep"> › </span>}
                {item}
              </span>
            );
          })}
        </nav>
      )}

      <div className="screen-header__row">
        <h1 className="screen-header__title">{title}</h1>
        {action}
      </div>

      {subtitle && <p className="screen-header__subtitle">{subtitle}</p>}
    </header>
  );
}
