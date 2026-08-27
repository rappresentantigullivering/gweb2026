'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';
import { RaSpinner } from './RaSpinner';

export type RaButtonVariant =
  | 'primary'   // rosso Gulliver: identita' comune (login, hub)
  | 'accent'    // colore dell'area corrente
  | 'outline'
  | 'subtle'
  | 'ghost'     // il vecchio "← Dashboard"
  | 'danger'
  | 'success'
  | 'link';

export interface RaButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: RaButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  block?: boolean;
  icon?: ReactNode;
  /** Se valorizzato rende un <a> mantenendo lo stesso aspetto. */
  href?: string;
  /**
   * Forza il tag. Serve quando l'href arriva solo dopo il montaggio (vedi
   * useAreaUrl): il tag deve restare lo stesso fra server e client.
   */
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
  children?: ReactNode;
}

export function RaButton({
  variant = 'subtle',
  size = 'md',
  loading = false,
  block = false,
  icon,
  href,
  as,
  target,
  rel,
  children,
  className,
  disabled,
  ...rest
}: RaButtonProps) {
  const cls = cx(s.btn, s[`btn_${variant}`], s[`btn_${size}`], block && s.btnBlock, className);
  const content = (
    <>
      {loading ? <RaSpinner size="sm" /> : icon}
      {children}
    </>
  );

  if (as === 'a' || href) {
    return (
      <a className={cls} href={href} target={target} rel={rel} aria-disabled={disabled || undefined}>
        {content}
      </a>
    );
  }

  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}
