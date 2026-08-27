import s from './riservata.module.css';
import { cx } from './types';

export interface RaSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

/** Unico spinner dell'area riservata: prima erano 4 misure e 6 keyframe. */
export function RaSpinner({ size = 'md', label, className }: RaSpinnerProps) {
  return (
    <span
      className={cx(s.spinner, s[`spinner_${size}`], className)}
      role="status"
      aria-label={label ?? 'Caricamento in corso'}
    />
  );
}
