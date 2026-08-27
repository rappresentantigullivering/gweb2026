'use client';

import { forwardRef } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export interface RaFieldProps {
  label?: ReactNode;
  htmlFor?: string;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

export function RaField({ label, htmlFor, hint, error, optional, className, children }: RaFieldProps) {
  return (
    <div className={cx(s.field, className)}>
      {label && (
        <label className={s.fieldLabel} htmlFor={htmlFor}>
          {label}
          {optional && <span className={s.fieldOptional}> (facoltativo)</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className={s.fieldHint}>{hint}</span>}
      {error && <span className={s.fieldError}>{error}</span>}
    </div>
  );
}

export const RaInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function RaInput({ className, invalid, ...rest }, ref) {
    return <input ref={ref} className={cx(s.input, invalid && s.inputInvalid, className)} aria-invalid={invalid || undefined} {...rest} />;
  },
);

export const RaSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function RaSelect({ className, children, ...rest }, ref) {
    return (
      <select ref={ref} className={cx(s.select, className)} {...rest}>
        {children}
      </select>
    );
  },
);

export const RaTextarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function RaTextarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cx(s.textarea, className)} {...rest} />;
  },
);

/** Campo con prefisso fisso a sinistra, come lo slug dei moduli. */
export function RaInputWithPrefix({
  prefix,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { prefix: string }) {
  return (
    <span className={s.inputPrefixWrap}>
      <span className={s.inputPrefix} aria-hidden="true">
        {prefix}
      </span>
      <input className={cx(s.input, className)} {...rest} />
    </span>
  );
}
