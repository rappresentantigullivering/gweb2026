import type { ReactNode } from 'react';
import s from './riservata.module.css';
import { cx } from './types';

export interface RaEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function RaEmptyState({ icon, title, description, action, className }: RaEmptyStateProps) {
  return (
    <div className={cx(s.empty, className)}>
      {icon && <span className={s.emptyIcon}>{icon}</span>}
      <h3 className={s.emptyTitle}>{title}</h3>
      {description && <p className={s.emptyDesc}>{description}</p>}
      {action}
    </div>
  );
}
