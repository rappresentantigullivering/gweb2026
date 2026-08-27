'use client';

import s from './riservata.module.css';
import { cx } from './types';

export interface RaToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  describedBy?: string;
  className?: string;
}

/**
 * Interruttore. La posizione del pomello e' in CSS via `data-on`, non piu'
 * in pixel inline nel TSX.
 */
export function RaToggle({ checked, onChange, disabled, label, describedBy, className }: RaToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-describedby={describedBy}
      disabled={disabled}
      className={cx(s.toggle, className)}
      onClick={() => onChange(!checked)}
    >
      <span className={s.toggleTrack} data-on={checked}>
        <span className={s.toggleKnob} />
      </span>
      {label && <span className={s.toggleLabel}>{label}</span>}
    </button>
  );
}
